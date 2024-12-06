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
import { CompanyType, ICompany } from '../companies/interfaces/company.interface';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CacheService } from '../cache/cache.service';
import { CreateEmailDto } from '../../shared/alerts/emails/dto/create-email.dto';
import { AppEvents } from '../../constants';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FilterUserDto } from './dto/add-user.dto';
import * as dayjs from 'dayjs';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { isDev } from '../../environment/isDev';
import env from '../../config/env.config';

@Injectable()
export class UsersService extends BasicService<User> {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>, // private jwtService: JwtService,
    private readonly rolesService: RolesService,
    private cacheService: CacheService,
    private readonly eventEmitter: EventEmitter2,
    @InjectQueue('userQueue') private readonly userQueue: Queue,
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

    const role = await this.rolesService.findOne(createUserDto.roleId);

    if (!password) {
      password = Helper.randString(3, 2, 6);
      setPassword = false;
      const otp = isDev() ? '123456' : await Helper.generateToken();

      await this.cacheService.set(`${email}-setPassword`, otp, null);

      const emailDto: CreateEmailDto = {
        receiverEmail: email,
        subject: 'Complete your registration',
        template: 'setPassword',
        senderEmail: env.emailUser,
        metaData: { code: otp, email, name: createUserDto.firstName, role: role.name },
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

  async findUsers(pagination: BasicPaginationDto, company: ICompany, filter: FilterUserDto, user: User) {
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
    } else if (company) {
      query.andWhere('user.companyId = :companyId', { companyId: company.id });
    } else {
      const comapnyId = user.companyId;
      query.andWhere('user.companyId = :companyId', { companyId: comapnyId });
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

  async deleteUser(userId: string, currentUser: User) {
    const user = await this.findUser(userId);

    if (user) {
      if (currentUser.id === userId) {
        throw new BadRequestException('You cannot delete yourself');
      }
      await this.userRepo.softDelete(userId);
    }
  }

  async approveUser(userId: string) {
    const user = await this.findUser(userId);

    if (user) {
      user.status = true;
      await user.save();
      const email: CreateEmailDto = {
        receiverEmail: user.email,
        subject: 'Account Approved',
        template: 'accountApproved',
        senderEmail: env.emailUser,
        metaData: { name: user.fullName },
      };

      this.eventEmitter.emit(AppEvents.SEND_EMAIl, email);

      return user;
    }

    throw new BadRequestException('User not found');
  }

  async getUnapprovedAdmins() {
    return this.userRepo.find({ where: { status: false, company: { type: CompanyType.UCTSS } } });
  }

  async assignRole(assignRoleDto: AssignRoleDto) {
    const { userId, roleId, effectiveDate } = assignRoleDto;
    const date = dayjs(effectiveDate).format('YYYY-MM-DD');
    if (dayjs().isAfter(date, 'day')) {
      throw new BadRequestException('Effective date must be today or in the future');
    }
    const user = await this.findOne(userId);
    const role = await this.rolesService.findOne(roleId);
    const email: CreateEmailDto = {
      receiverEmail: user.email,
      subject: 'Role assigned',
      template: 'roleChanged',
      senderEmail: env.emailUser,
      metaData: { role: role.name, name: user.fullName, dateEffective: dayjs(date).format('dddd, MMMM D YYYY') },
    };
    if (dayjs().isSame(date, 'day')) {
      user.role = role;
      await user.save();
      this.eventEmitter.emit(AppEvents.SEND_EMAIl, email);
      return user;
    } else {
      // send to queue to run on effective date
      this.eventEmitter.emit(AppEvents.SEND_EMAIl, email);
      await this.userQueue.add('assignRole', assignRoleDto, { delay: dayjs(date).diff(dayjs(), 'milliseconds') });
      return user;
    }
  }
}
