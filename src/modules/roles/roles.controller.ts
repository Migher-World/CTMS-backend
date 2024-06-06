import { Controller, Post, Body, Put, Param, Get, Delete, Query } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, FilterRolesDto } from './dto/create-role.dto';
import { AddPermissionsToRoleDto, UpdateRoleDto } from './dto/update-role.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { resolveResponse } from '../../shared/resolvers';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { Headers } from '../../shared/decorators/headers.decorator';
import { ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Roles')
@ApiBearerAuth()
@Headers()
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  async findAll(
    @Query() pagination: BasicPaginationDto,
    @Query() filter: FilterRolesDto,
    @CurrentCompany() company: ICompany,
  ) {
    return resolveResponse(this.rolesService.findAllByCompanyId(pagination, company, filter));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return resolveResponse(this.rolesService.findOne(id));
  }

  @Get('list/get')
  async list(@Query() filter: FilterRolesDto) {
    return resolveResponse(this.rolesService.listRoles(filter));
  }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @CurrentCompany() company: ICompany, @CurrentUser() user: User) {
    return resolveResponse(this.rolesService.create(createRoleDto, company, user), 'Role Created');
  }

  @Put('update-permissions')
  async addPermissionToRole(@Body() addPermissionToRoleDto: AddPermissionsToRoleDto) {
    return resolveResponse(this.rolesService.addPermissionsToRole(addPermissionToRoleDto), 'Role Permissions Updated');
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return resolveResponse(this.rolesService.update(id, updateRoleDto));
  }

  @Put('remove-permissions')
  async removePermissionsFromRole(@Body() removePermissionsFromRoleDto: AddPermissionsToRoleDto) {
    return resolveResponse(
      this.rolesService.removePermissionsFromRole(removePermissionsFromRoleDto),
      'Role Permissions Removed',
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return resolveResponse(this.rolesService.remove(id));
  }
}
