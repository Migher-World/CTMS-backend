import { Controller, Post, Body, Put, Param, Get } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { AddPermissionsToRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { resolveResponse } from '../../shared/resolvers';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { Headers } from '../../shared/decorators/headers.decorator';
import { ICompany } from '../companies/interfaces/company.interface';

@ApiTags('Roles')
@ApiBearerAuth()
@Headers()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(@CurrentCompany() company: ICompany) {
    return resolveResponse(this.rolesService.findAllByCompanyId(company.id));
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.rolesService.create({ ...createRoleDto, companyId: company.id }));
  }

  @Put('update-permissions')
  async addPermissionToRole(@Body() addPermissionToRoleDto: AddPermissionsToRoleDto) {
    return resolveResponse(this.rolesService.addPermissionsToRole(addPermissionToRoleDto), 'Role Permissions Updated');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return resolveResponse(this.rolesService.update(id, updateRoleDto));
  }
}
