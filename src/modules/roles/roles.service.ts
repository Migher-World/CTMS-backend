import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicService } from '../../shared/services/basic-service.service';
import { Permission } from '../permissions/entities/permission.entity';
import { AddPermissionsToRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';

@Injectable()
export class RolesService extends BasicService<Role> {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {
    super(roleRepo, 'Roles');
  }

  async create(createRoleDto: CreateRoleDto, company: ICompany) {
    const { permissionsId } = createRoleDto;
    const permissions = await this.resolveRelationships(permissionsId, Permission);
    return super.create({ ...createRoleDto, permissions, companyId: company.id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const { permissionsId } = updateRoleDto;
    const permissions = await this.resolveRelationships(permissionsId, Permission);
    const role = await this.findOne(id);
    role.permissions = permissions;
    const data = this.roleRepo.merge(role, updateRoleDto);
    return this.roleRepo.save(data);
  }

  async addPermissionsToRole(addPermissionsToRoleDto: AddPermissionsToRoleDto) {
    const { roleId, permissionsId } = addPermissionsToRoleDto;
    const role = await this.findOne(roleId);

    const permissions = await this.resolveRelationships(permissionsId, Permission);
    role.permissions = permissions;
    return this.roleRepo.save(role);
  }

  async findAllByCompanyId(pagination: BasicPaginationDto, company: ICompany) {
    const query = this.roleRepo.createQueryBuilder('role').leftJoinAndSelect('role.company', 'company');
    if (company) {
      query.andWhere('role.companyId = :companyId', { company: company.id });
    }
    return this.paginate(query, pagination);
  }

  async removePermissionsFromRole(removePermissionsFromRoleDto: AddPermissionsToRoleDto) {
    const { roleId, permissionsId } = removePermissionsFromRoleDto;
    const role = await this.findOne(roleId);
    const permissions = await this.resolveRelationships(permissionsId, Permission);
    role.permissions = role.permissions.filter((permission) => !permissions.includes(permission));
    return this.roleRepo.save(role);
  }
}
