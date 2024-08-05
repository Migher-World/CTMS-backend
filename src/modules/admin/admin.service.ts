import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../config/db.config';
import { Trial } from '../trials/entities/trial.entity';
import { LessThan } from 'typeorm';
import { Company } from '../companies/entities/company.entity';
import { CompanyType } from '../companies/interfaces/company.interface';

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
}
