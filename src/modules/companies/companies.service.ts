import { BadRequestException, Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Company } from './entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesService } from '../roles/roles.service';
import { CompanyType } from './interfaces/company.interface';
import * as individualRoles from '../../json/individual-roles.json';
import * as siteRoles from '../../json/site-roles.json';
import * as sponsorRoles from '../../json/sponsor-roles.json';
import * as vendorRoles from '../../json/vendor-roles.json';
import { IRole } from '../roles/interface/role.interface';

@Injectable()
export class CompaniesService extends BasicService<Company> {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: typeof Company,
    private roleService: RolesService,
  ) {
    super(companyRepository, 'Company');
  }

  async createCompanyDefaultRoles(company: Company) {
    // const company = await this.findOne(companyId);
    const rolesJson = await this.prepareRoles(company.type);
    rolesJson.map((role) => {
      role.companyId = company.id;
    });
    const roles = await this.roleService.bulkCreate(rolesJson);
    return roles;
  }

  async prepareRoles(companyType: CompanyType) {
    let rolesJson = [] as Partial<IRole>[];
    if (companyType === CompanyType.INDIVIDUAL) {
      rolesJson = individualRoles;
    } else if (companyType === CompanyType.SITE) {
      rolesJson = siteRoles;
    } else if (companyType === CompanyType.SPONSOR) {
      rolesJson = sponsorRoles;
    } else if (companyType === CompanyType.VENDOR) {
      rolesJson = vendorRoles;
    } else {
      throw new BadRequestException('Invalid company type');
    }
    return rolesJson;
  }
}
