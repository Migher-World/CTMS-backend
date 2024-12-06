import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicService } from '../../shared/services/basic-service.service';
import { Permission } from '../permissions/entities/permission.entity';
import { AddPermissionsToRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { CreateRoleDto, FilterRolesDto } from './dto/create-role.dto';
import { ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RolesService extends BasicService<Role> {
  constructor(@InjectRepository(Role) private readonly roleRepo: Repository<Role>) {
    super(roleRepo, 'Roles', ['id', 'name', 'companyId']);
  }

  async create(createRoleDto: CreateRoleDto, company: ICompany, user: User) {
    const { permissionsId } = createRoleDto;
    let companyId;
    if (!company) {
      companyId = user.companyId;
    } else {
      companyId = company.id;
    }
    const permissions = await this.resolveRelationships(permissionsId, Permission);
    return super.create({ ...createRoleDto, permissions, companyId });
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
    // remove duplicates
    role.permissions = role.permissions.filter((permission, index, self) => self.findIndex((p) => p.id === permission.id) === index);
    return this.roleRepo.save(role);
  }

  async findAllByCompanyId(pagination: BasicPaginationDto, company: ICompany, filter: FilterRolesDto) {
    const { companyId } = filter;
    const query = this.roleRepo.createQueryBuilder('role').leftJoinAndSelect('role.company', 'company');
    if (company) {
      query.andWhere('role.companyId = :companyId', { companyId: company.id });
    }
    if (companyId) {
      query.andWhere('role.companyId = :companyId', { companyId });
    }
    return this.paginate(query, pagination);
  }

  async listRoles(filter: FilterRolesDto) {
    const { companyId } = filter;
    const query = this.roleRepo.createQueryBuilder('role').select(['role.id', 'role.name', 'role.companyId']);
    if (companyId) {
      query.andWhere('role.companyId = :companyId', { companyId });
    }
    return query.getMany();
  }

  async removePermissionsFromRole(removePermissionsFromRoleDto: AddPermissionsToRoleDto) {
    const { roleId, permissionsId } = removePermissionsFromRoleDto;
    const role = await this.findOne(roleId);
    const permissions = await this.resolveRelationships(permissionsId, Permission);
    role.permissions = role.permissions.filter((permission) => !permissions.includes(permission));
    return this.roleRepo.save(role);
  }

  async delete(id: string, user: User) {
    if(id === user.roleId) {
      throw new BadRequestException('You cannot delete your own role');
    }
    return this.roleRepo.softDelete(id);
  }
}
