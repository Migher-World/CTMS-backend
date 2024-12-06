import { Controller, Post, Body, Get, Param, Patch, Delete, Query, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssignRoleDto } from './dto/assign-role.dto';
import { resolveResponse } from '../../shared/resolvers';
import { Headers } from '../../shared/decorators/headers.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { FilterUserDto } from './dto/add-user.dto';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from './entities/user.entity';

@ApiTags('Users')
@ApiBearerAuth()
@Headers()
// @UseGuards(AuthGuard, PermissionGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Permissions('user.create')
  @Post()
  async create(@Req() request, @Body() createUserDto: CreateUserDto) {
    const companyId = request.headers['x-company-id'];
    return resolveResponse(this.usersService.create(createUserDto, companyId), 'Account Created');
  }

  @Get()
  async findUsers(
    @Query() pagination: BasicPaginationDto,
    @CurrentCompany() company: ICompany,
    @Query() filter: FilterUserDto,
    @CurrentUser() user: User
  ) {
    return resolveResponse(this.usersService.findUsers(pagination, company, filter, user), 'All Users Found');
  }

  @Get(':id')
  async findUser(@Param('id') id: string) {
    return resolveResponse(this.usersService.findUser(id), 'User Found');
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return resolveResponse(this.usersService.updateUser(id, updateUserDto), 'User Updated');
  }

  @Patch('update-profile/:id')
  async updateProfile(@Param('id') id: string, @CurrentUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return resolveResponse(this.usersService.updateProfile(id, updateUserDto, user), 'Profile Updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @CurrentUser() user: User) {
    return resolveResponse(this.usersService.deleteUser(id, user), 'User deleted');
  }

  @Post('assign-role')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return resolveResponse(this.usersService.assignRole(assignRoleDto), 'Role Assigned');
  }

  @Post('approve/:id')
  async approveUser(@Param('id') id: string) {
    return resolveResponse(this.usersService.approveUser(id), 'User Approved');
  }

  @Get('unapproved/get')
  async getUnapprovedAdmins() {
    return resolveResponse(this.usersService.getUnapprovedAdmins(), 'Unapproved Users Found');
  }
}
