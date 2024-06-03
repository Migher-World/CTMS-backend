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
import { ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CacheService } from '../cache/cache.service';
import { CreateEmailDto } from '../../shared/alerts/emails/dto/create-email.dto';
import { AppEvents } from '../../constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilterUserDto } from './dto/add-user.dto';

@Injectable()
export class UsersService extends BasicService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, // private jwtService: JwtService,
    private readonly rolesService: RolesService,
    private cacheService: CacheService,
    private readonly eventEmitter: EventEmitter2,
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

  async create(createUserDto: CreateUserDto, companyId: string) {
    let { password, setPassword, email } = createUserDto;

    await this.checkDuplicate(createUserDto);

    if (!password) {
      password = Helper.randString(3, 2, 6);
      setPassword = false;
      const otp = 123456;

      await this.cacheService.set(email, otp, 60 * 60 * 24);

      const emailDto: CreateEmailDto = {
        receiverEmail: email,
        subject: 'Complete your registration',
        template: 'setPassword',
        metaData: { code: otp, email },
      };

      this.eventEmitter.emit(AppEvents.SEND_EMAIl, emailDto);
    } else {
      setPassword = true;
    }

    const response = this.userRepo.create({ ...createUserDto, password, setPassword, companyId });

    const user = await this.userRepo.save(response);
    return user;
  }

  async findUserByEmail(email: string) {
    const isEmailExist = await this.userRepo.findOne({ where: { email } });

    if (isEmailExist) {
      throw new BadRequestException('Email exists');
    }
  }

  async findUsers(pagination: BasicPaginationDto, company: ICompany, filter: FilterUserDto) {
    const query = this.userRepo.createQueryBuilder('user').leftJoinAndSelect('user.role', 'role');
    if (filter.search) {
      query.andWhere('(user.firstName ILIKE :search OR user.lastName ILIKE :search OR user.email ILIKE :search)', {
        search: `%${filter.search}%`,
      });
    }
    if (filter.companyType) {
      query
        .innerJoin('user.company', 'company')
        .andWhere('company.type = :companyType', { companyType: filter.companyType });
    }
    if (filter.companyId) {
      query.andWhere('user.companyId = :companyId', { companyId: filter.companyId });
    }
    if (company) {
      query.andWhere('user.companyId = :companyId', { companyId: company.id });
    }
    return this.paginate(query, pagination);
  }

  async findUser(userId: string) {
    const id = userId;
    const user = await this.userRepo.findOne({ where: { id } });
    return user;
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const user = await this.findUser(userId);

    if (user) {
      const updatedUser = await this.userRepo.update(userId, updateUserDto);
      return updatedUser;
    }
  }

  async updateProfile(userId: string, updateUserDto: UpdateUserDto, user: User) {
    if (user.id !== userId) {
      throw new BadRequestException('You are not authorized to perform this action');
    }
    const updatedUser = await this.userRepo.update(userId, updateUserDto);
    return updatedUser;
  }

  async deleteUser(userId: string) {
    const user = await this.findUser(userId);

    if (user) {
      await this.userRepo.softDelete(userId);
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
