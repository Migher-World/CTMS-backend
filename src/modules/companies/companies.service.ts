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
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CreateCompanyDto, CreateCompanyWithUserDto, FilterCompanyDto } from './dto/create-company.dto';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { Permission } from '../permissions/entities/permission.entity';

@Injectable()
export class CompaniesService extends BasicService<Company> {
  constructor(
    @InjectRepository(Company) private readonly companyRepository: Repository<Company>,
    private roleService: RolesService,
    private readonly usersService: UsersService,
  ) {
    super(companyRepository, 'Company');
  }

  async createCompany(data: CreateCompanyWithUserDto) {
    const {user} = data;
    const company = this.companyRepository.create(data);
    const result = await company.save();
    const roles = await this.createCompanyDefaultRoles(result);
    // create user with admin role
    const userData = await this.usersService.create({
      ...user,
      roleId: roles.find((role) => role.name.includes('admin')).id,
    }, result.id);
    return {
      company: result,
      user: userData,
    };
  }

  async createCompanyDefaultRoles(company: Company) {
    // const company = await this.findOne(companyId);
    const rolesJson = await this.prepareRoles(company.type);
    const payload = rolesJson.map(async (role) => {
      const permissions = await this.roleService.resolveRelationships(role.permissions, Permission);
      role.companyId = company.id;
      role.permissions = permissions;
      return role;
    });
    const rolesData = await Promise.all(payload);
    const roles = await this.roleService.bulkCreate(rolesData);
    return roles;
  }

  // TODO: get list of trials a company is assigned to
  async findAll(pagination: BasicPaginationDto, filter: FilterCompanyDto) {
    const { industry, type, sortBy } = filter;
    const query = this.companyRepository.createQueryBuilder('company');
    if (type) {
      query.andWhere('company.type = :type', { type: filter.type });
    }

    if (industry) {
      query.andWhere('company.industry = :industry', { industry: filter.industry });
    }

    if (sortBy) {
      query.orderBy('company.createdAt', sortBy);
    } else {
      query.orderBy('company.createdAt', 'DESC');
    }

    // if(name) {
    //   query.andWhere('company.name ILIKE :name', { name: `%${name}%` });
    // }
    return this.paginate(query, pagination);
  }

  async listAll(filter: FilterCompanyDto) {
    const { industry, type } = filter;
    const query = this.companyRepository.createQueryBuilder('company');
    if (type) {
      query.andWhere('company.type = :type', { type: filter.type });
    }

    if (industry) {
      query.andWhere('company.industry = :industry', { industry: filter.industry });
    }

    return query.getMany();
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
