import { BadRequestException, Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/db.config';
import { Trial } from '../trials/entities/trial.entity';
import { LessThan } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CompanyType } from '../companies/interfaces/company.interface';
import { Patient } from '../patients/entities/patient.entity';
import { Issue } from '../issues/entities/issues.entity';
import { User } from '../users/entities/user.entity';
import { Contract } from '../contract/entities/contract.entity';

@Injectable()
export class AdminService {
  constructor() {}

  async getDashboardData() {
    // get active sites, active trials, active sponsors, active vendors

    const activeTrials = await AppDataSource.getRepository(Trial).count({
      where: { endDate: LessThan(new Date().toDateString()) },
    });

    const activeCompanies = await AppDataSource.getRepository(Company).find();

    const activeSponsors = activeCompanies.filter((company) => company.type === CompanyType.SPONSOR).length;
    const activeVendors = activeCompanies.filter((company) => company.type === CompanyType.VENDOR).length;
    const activeSites = activeCompanies.filter((company) => company.type === CompanyType.SITE).length;

    return {
      activeTrials,
      activeSponsors,
      activeVendors,
      activeSites,
    };
  }


  /**
   * Retrieves the dashboard data for a specific company, including patient data by status,
   * issue data by status, user count, and patient demographics.
   *
   * @param {string} companyId - The ID of the company for which to retrieve dashboard data.
   * @returns {Promise<{
   *   patientData: {
   *     enrolled: number;
   *     withdrawn: number;
   *     completed: number;
   *     onHold: number;
   *     screeningInProgress: number;
   *     screeningFailed: number;
   *     inactive: number;
   *     pendingConsent: number;
   *     pendingScreeningResults: number;
   *   };
   *   issueData: {
   *     OPEN: number;
   *     IN_PROGRESS: number;
   *     DONE: number;
   *     CLOSE: number;
   *   };
   *   users: number;
   *   patientsByDemographics: Record<string, number>;
   * }>} An object containing the dashboard data for the specified company.
   * @throws {BadRequestException} If the companyId is not provided.
   */
  async getCompanyDashboardData(companyId: string) {
    if(!companyId) {
      throw new BadRequestException('You must provide a company id');
    }
    const patients = await AppDataSource.getRepository(Patient).find({ where: { companyId: companyId } });
    const issues = await AppDataSource.getRepository(Issue).find({ where: { companyId: companyId } });
    const users = await AppDataSource.getRepository(User).find({ where: { companyId: companyId } });

    // data by status
    const patientData = patients.reduce(
      (acc, patient) => {
        acc.enrolled += patient.enrollmentStatus === 'Enrolled' ? 1 : 0;
        acc.withdrawn += patient.enrollmentStatus === 'Withdrawn' ? 1 : 0;
        acc.completed += patient.enrollmentStatus === 'Completed' ? 1 : 0;
        acc.onHold += patient.enrollmentStatus === 'On Hold' ? 1 : 0;
        acc.screeningInProgress += patient.enrollmentStatus === 'Screening In Progress' ? 1 : 0;
        acc.screeningFailed += patient.enrollmentStatus === 'Screening Failed' ? 1 : 0;
        acc.inactive += patient.enrollmentStatus === 'Inactive' ? 1 : 0;
        acc.pendingConsent += patient.enrollmentStatus === 'Pending Consent' ? 1 : 0;
        acc.pendingScreeningResults += patient.enrollmentStatus === 'Pending Screening Results' ? 1 : 0;
        return acc;
      },
      {
        enrolled: 0,
        withdrawn: 0,
        completed: 0,
        onHold: 0,
        screeningInProgress: 0,
        screeningFailed: 0,
        inactive: 0,
        pendingConsent: 0,
        pendingScreeningResults: 0,
      },
    );

    const issueData = issues.reduce(
      (acc, issue) => {
        acc[issue.status] += 1;
        return acc;
      },
      {
        OPEN: 0,
        IN_PROGRESS: 0,
        DONE: 0,
        CLOSE: 0,
      },
    );

    const patientsByDemographics = patients.reduce(
      (acc, patient) => {
        acc[patient.nationality] += 1;
        return acc;
      }
    );

    return {
      patientData,
      issueData,
      users: users.length,
      patientsByDemographics,
    }
  }

  async getCompanyBudgetData(companyId: string) {
    // get budget data for a specific company that are ongoing, i.e startDate < today < endDate
    // also the number of ongoing trials
    // also the number of expenses (the expenses are contracts)
    // then a financial overview of the company which is a chart of the budget vs expenses for the ongoing trials

    const company = await AppDataSource.getRepository(Company).findOne({ where: { id: companyId } });
    const trials = await AppDataSource.getRepository(Trial).find({ where: { companyId: companyId, endDate: LessThan(new Date().toDateString()) } });
    const contracts = await AppDataSource.getRepository(Contract).find({ where: { trial: {companyId: companyId}, expirationDate: LessThan(new Date().toDateString()) } });

    const ongoingTrials = trials.length;
    const ongoingExpenses = contracts.length;

    // financial overview should be for each trial and should be for active budgets and expenses
    const financialOverview = trials.map(trial => {
      const activeBudgets = trial.budgets.filter(budget => new Date(budget.startDate) < new Date() && new Date(budget.endDate) > new Date());
      const activeExpenses = contracts.filter(contract => new Date(contract.effectiveDate) < new Date() && new Date(contract.expirationDate) > new Date());
      return {
        trialId: trial.id,
        trialName: trial.name,
        activeBudgets,
        activeExpenses,
      }
    });

    return {
      ongoingTrials,
      ongoingExpenses,
      financialOverview,
    };
  }
}
