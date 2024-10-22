import { BadRequestException, Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/db.config';
import { Trial } from '../trials/entities/trial.entity';
import { LessThan } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CompanyType } from '../companies/interfaces/company.interface';
import { Patient } from '../patients/entities/patient.entity';
import { Issue } from '../issues/entities/issues.entity';
import { User } from '../users/entities/user.entity';

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
   * issue data by status, and the total number of users.
   *
   * @param {string} companyId - The ID of the company for which to retrieve the dashboard data.
   * @returns {Promise<{ patientData: Record<string, number>, issueData: Record<string, number>, users: number }>} 
   * An object containing patient data by status, issue data by status, and the total number of users.
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

    return {
      patientData,
      issueData,
      users: users.length,
    }
  }
}
