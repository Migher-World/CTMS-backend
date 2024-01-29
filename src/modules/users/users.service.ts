import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Helper } from '../../shared/helpers';
import { BasicService } from '../../shared/services/basic-service.service';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { AssignRoleDto } from './dto/assign-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AddUserDto } from './dto/add-user.dto';
import { CreateClientDto } from '../clients/dto/create-client.dto';
import { Client } from '../clients/entities/client.entity';

@Injectable()
export class UsersService extends BasicService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, // private jwtService: JwtService,
    private readonly rolesService: RolesService,
  ) {
    super(userRepo, 'Users');
  }

  async checkDuplicate(user: Partial<User>) {
    const { email, phoneNumber } = user;
    const isEmailExist = await this.userRepo.findOne({ where: { email } });
    const isTelephoneExist = await this.userRepo.findOne({
      where: { phoneNumber },
    });

    if (isEmailExist && isTelephoneExist) {
      throw new BadRequestException('Email and phone number already exists');
    }

    if (isEmailExist) {
      throw new BadRequestException('Email exists');
    }

    if (isTelephoneExist) {
      throw new BadRequestException('Phone number exists');
    }
  }

  async create(createUserDto: CreateUserDto, companyId:string) {
    let { password } = createUserDto;

    await this.checkDuplicate(createUserDto);

    if (!password) {
      password = Helper.randString(3, 2, 6);
    }

    const response = this.userRepo.create({ ...createUserDto, password, companyId });

    const user = await this.userRepo.save(response);
    return user;
  }

  async findUsers(){
    const users = await this.userRepo.find();
    return users;
  }

  async findUser(userId: string){
    const id = userId
    const user = await this.userRepo.findOne({where: {id}});
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto){
    const existingUser = await this.findUser(userId);

    if (!existingUser){
      throw new Error('User not Found')
    }

    Object.assign(existingUser, updateUserDto);

    const updatedUser = await this.userRepo.save(existingUser);
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await this.findUser(userId);

    if (user){
      await this.userRepo.delete(userId)
    }
  }

  async assignRole(assignRoleDto: AssignRoleDto) {
    const { userId, roleId } = assignRoleDto;
    const user = await this.findOne(userId);
    const role = await this.rolesService.findOne(roleId);
    user.role = role;
    await user.save();
    return user;
  }
}
