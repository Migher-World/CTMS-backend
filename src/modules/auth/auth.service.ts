import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import {
  AdminRegisterDto,
  AuthPayload,
  LoginDto,
  RegisterDto,
  RequestResetPasswordDto,
  ResetPasswordDto,
  SetPasswordDto,
  VerifyOTPDto,
} from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UsersService } from '../users/users.service';
import { AppDataSource } from '../../config/db.config';
import { Helper } from '../../shared/helpers';
import { Company } from '../companies/entities/company.entity';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CompanyType } from '../companies/interfaces/company.interface';
import { User } from '../users/entities/user.entity';
import { CompaniesService } from '../companies/companies.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';
import { AppEvents } from 'src/constants';
import { EmailEntity } from 'src/shared/alerts/emails/entities/email.entity';
import { CreateEmailDto } from 'src/shared/alerts/emails/dto/create-email.dto';
import { Role } from '../roles/entities/role.entity';
import { isDev } from '../../environment/isDev';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    private usersService: UsersService,
    private companyService: CompaniesService,
    private cacheService: CacheService,
    private readonly eventEmitter: EventEmitter2,
  ) {}
  async signUp(credentials: RegisterDto) {
    const transaction = await AppDataSource.transaction(async (manager) => {
      let { password, setPassword, email, phoneNumber } = credentials;

      await this.usersService.checkDuplicate({ email, phoneNumber });

      const companyDto: CreateCompanyDto =
        credentials.company.type === CompanyType.SPONSOR
          ? { ...credentials.company, name: `${credentials.firstName}: ${credentials.company.type} Company` }
          : credentials.company;

      if (credentials.company.type === CompanyType.UTCSS) {
        throw new BadRequestException('Invalid company type');
      }

      const company = await manager.save<Company>(manager.create<Company>(Company, companyDto));

      // const roles = await this.companyService.createCompanyDefaultRoles(company);

      const user = await manager.save<User>(
        manager.create<User>(User, {
          ...credentials,
          password,
          setPassword,
          company,
          // role: roles.find((role) => role.name.includes('admin')),
        }),
      );

      const payload: AuthPayload = { id: user.id };
      const token = this.jwtService.sign(payload);

      const roles = await this.companyService.createCompanyDefaultRoles(user.company, manager);

      console.log({ roles });

      user.role = roles.find((role) => role.name.includes('admin'));

      await manager.save(user);

      // await this.userRepo.update(user.id, { roleId: roles.find((role) => role.name.includes('admin')).id });

      return { user, token };
    });

    await this.sendOtp(credentials.email);

    const userWithPermissions = Helper.formatPermissions(transaction.user);

    return { user: userWithPermissions, token: transaction.token };
  }

  async utcssSignUp(credentials: AdminRegisterDto) {
    const transaction = await AppDataSource.transaction(async (manager) => {
      let { password, setPassword, email, phoneNumber } = credentials;

      // if (!email.includes('@unitedclinicalss.com')) {
      //   throw new BadRequestException('Invalid email, you can only register with a unitedclinicalss email address');
      // }

      await this.usersService.checkDuplicate({ email, phoneNumber });

      let company;

      const companyDto: CreateCompanyDto = {
        address: 'United Clinicals',
        email: 'utcss@unitedclinicalss.com',
        name: 'UTCSS',
        phoneNumber: '08012345678',
        type: CompanyType.UTCSS,
      };

      company = await manager.findOne<Company>(Company, { where: { name: companyDto.name } });

      if (!company) {
        company = await manager.save<Company>(manager.create<Company>(Company, companyDto));
      }

      let user = await manager.save<User>(
        manager.create<User>(User, {
          ...credentials,
          password,
          setPassword,
          company,
          roleId: 'ebd21799-a716-405b-a080-e4faf6a2d43d',
          status: false,
        }),
      );

      console.log(user);

      const payload: AuthPayload = { id: user.id };
      const token = this.jwtService.sign(payload);

      const role = await manager.findOne<Role>(Role, { where: { id: 'ebd21799-a716-405b-a080-e4faf6a2d43d' } });

      const userWithPermissions = Helper.formatPermissions({ ...user, role } as User);

      // send 2 emails, one to the user and one to existing admins

      const createEmailDto: CreateEmailDto = {
        subject: 'New Admin Registration',
        template: 'new-admin',
        senderEmail: 'CTMS Info <info@lendhive.app>',
        metaData: {
          name: user.firstName,
          email: user.email,
        },
        receiverEmail: 'noriaphilips@unitedclinicalss.com, jade@unitedclinicalss.com',
      };

      this.eventEmitter.emit(AppEvents.SEND_EMAIl, createEmailDto);

      return { userWithPermissions, token };
    });

    await this.sendOtp(credentials.email);

    return transaction;
  }

  // async signUp(credentials: RegisterDto) {
  //   const queryRunner = AppDataSource.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     const { password, setPassword, email, phoneNumber } = credentials;

  //     await this.usersService.checkDuplicate({ email, phoneNumber });

  //     const companyDto: CreateCompanyDto =
  //       credentials.company.type === CompanyType.INDIVIDUAL || credentials.company.type === CompanyType.SPONSOR
  //         ? { ...credentials.company, name: `${credentials.firstName}: ${credentials.company.type} Company` }
  //         : credentials.company;

  //     const company = await queryRunner.manager.save<Company>(queryRunner.manager.create<Company>(Company, companyDto));

  //     const roles = await this.companyService.createCompanyDefaultRoles(company);

  //     const user = await queryRunner.manager.save<User>(
  //       queryRunner.manager.create<User>(User, {
  //         ...credentials,
  //         password,
  //         setPassword,
  //         company,
  //         role: roles.find((role) => role.name.includes('admin')),
  //       }),
  //     );

  //     const payload: AuthPayload = { id: user.id };
  //     const token = this.jwtService.sign(payload);

  //     const userWithPermissions = Helper.formatPermissions(user);

  //     await queryRunner.commitTransaction();

  //     return { userWithPermissions, token };
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();
  //     throw error;
  //   } finally {
  //     await queryRunner.release();
  //   }
  // }

  async signIn(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.usersService.findOne(email, 'email', ['company']);
      if (user && (await user.comparePassword(password))) {
        // if (!user.emailVerified) {
        //   this.sendOtp(user.email);
        // }
        const payload: AuthPayload = { id: user.id };
        const token = this.jwtService.sign(payload);
        const userWithPermissions = Helper.formatPermissions(user);
        return { user: userWithPermissions, token };
      }
      throw new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async setPassword(setPasswordDto: SetPasswordDto) {
    const { email, password, code } = setPasswordDto;

    const storedOtp = await this.cacheService.get(email);
    if (code != storedOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const newPassword = await Helper.hash(password);
    const user = await this.userRepo.findOne({ where: { email } });

    await this.cacheService.delete(email);

    if (user.setPassword == true) {
      throw new BadRequestException('Password already set');
    }

    Object.assign(user, { password: newPassword, setPassword: true, emalVerified: true });
    const updatedUserPassword = await this.userRepo.save(user);

    return updatedUserPassword;
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const isEmailExist = await this.userRepo.findOne({ where: { email } });
    if (!isEmailExist) {
      throw new BadRequestException('Email does not exist');
    }
    // Generate otp
    await this.sendOtp(email);
    return isEmailExist;
  }

  async sendOtp(email: string) {
    const otp = isDev() ? '123456' : await Helper.generateToken();

    // Save to redis
    await this.cacheService.set(email, otp, 600);

    // Send mail
    const createEmailDto: CreateEmailDto = {
      subject: 'Confirm OTP',
      template: 'otp',
      senderEmail: 'CTMS Info <info@lendhive.app>',
      metaData: {
        code: otp,
      },
      receiverEmail: email,
    };
    this.eventEmitter.emit(AppEvents.SEND_EMAIl, createEmailDto);
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, password, otp } = resetPasswordDto;
    const newPassword = await Helper.hash(password);

    // Retrieve Otp from Cache
    const storedOtp = await this.cacheService.get(email);
    if (otp != storedOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.userRepo.findOne({ where: { email } });
    Object.assign(user, { password: newPassword });
    const updatedUserPassword = await this.userRepo.save(user);

    return updatedUserPassword;
  }

  async verifyOTP(verifyOTPDto: VerifyOTPDto) {
    const { code, email } = verifyOTPDto;
    const otp = await this.cacheService.get(email);
    if (otp !== code) {
      throw new UnauthorizedException('Invalid OTP');
    }
    return true;
  }

  async verifyAccount(verifyOTPDto: VerifyOTPDto) {
    const { email } = verifyOTPDto;
    await this.verifyOTP(verifyOTPDto);
    await this.cacheService.delete(email);
    const user = await this.usersService.findOne(email, 'email');
    if (user.emailVerified) {
      throw new BadRequestException('Email already verified');
    }
    user.emailVerified = true;
    await user.save();
    const payload: AuthPayload = { id: user.id };
    const token = this.jwtService.sign(payload);
    const userWithPermissions = Helper.formatPermissions(user);
    return {
      user: userWithPermissions,
      token,
    };
  }
}
