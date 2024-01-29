import { Controller, Get, Post, Body, Put, Param, Delete, Query } from '@nestjs/common';
import { PermissionGroupsService } from './permission-groups.service';
import { CreatePermissionGroupDto } from './dto/create-permission-group.dto';
import { UpdatePermissionGroupDto } from './dto/update-permission-group.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { resolveResponse } from '../../shared/resolvers';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';

@ApiTags('Permission Groups')
@ApiBearerAuth()
@Controller('permission-groups')
export class PermissionGroupsController {
  constructor(private readonly permissionGroupsService: PermissionGroupsService) {}

  @Post()
  create(@Body() createPermissionGroupDto: CreatePermissionGroupDto) {
    return resolveResponse(this.permissionGroupsService.create(createPermissionGroupDto), 'Permission Group Created');
  }

  @Get()
  findAll(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.permissionGroupsService.findAll(pagination));
  }

  @Get('/list/get')
  list() {
    return resolveResponse(this.permissionGroupsService.list());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return resolveResponse(this.permissionGroupsService.findOne(id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePermissionGroupDto: UpdatePermissionGroupDto) {
    return resolveResponse(
      this.permissionGroupsService.update(id, updatePermissionGroupDto),
      'Permission Group Updated',
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return resolveResponse(this.permissionGroupsService.remove(id), 'Permission Group Deleted');
  }
}
