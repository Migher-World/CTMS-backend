import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AssignRoleDto } from './dto/assign-role.dto';
import { resolveResponse } from '../../shared/resolvers';
import { AddUserDto } from './dto/add-user.dto';
import { CreateClientDto } from '../clients/dto/create-client.dto';

@ApiTags('Users')
@ApiBearerAuth()
// @UseGuards(AuthGuard, PermissionGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Permissions('user.create')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return resolveResponse(
      this.usersService.create(createUserDto),
      'Account Created',
    );
  }

  @Post()
  async add(@Body() addUserDto:AddUserDto, createClientDto:CreateClientDto) {
    return resolveResponse(
      this.usersService.addUser(addUserDto, createClientDto),
      'User Added',
    )
  }

  @Post('assign-role')
  async assignRole(@Body() assignRoleDto: AssignRoleDto) {
    return resolveResponse(
      this.usersService.assignRole(assignRoleDto),
      'Role Assigned',
    );
  }
}
