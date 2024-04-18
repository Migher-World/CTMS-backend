import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload, LoginDto, RegisterDto, RequestResetPasswordDto, ResetPasswordDto, SetPasswordDto } from './auth.dto';
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
      let { password, setPassword,email, phoneNumber } = credentials;

      await this.usersService.checkDuplicate({ email, phoneNumber });

      if (!password) {
        password = Helper.randString(3, 2, 6);
        setPassword = false;
      }else{
        setPassword = true
      }

      const companyDto: CreateCompanyDto =
        credentials.company.type === CompanyType.INDIVIDUAL || credentials.company.type === CompanyType.SPONSOR
          ? { ...credentials.company, name: `${credentials.firstName}: ${credentials.company.type} Company` }
          : credentials.company;

      const company = await manager.save<Company>(manager.create<Company>(Company, companyDto));

      const roles = await this.companyService.createCompanyDefaultRoles(company);
      
      const user = await manager.save<User>(
        manager.create<User>(User, {
          ...credentials,
          password,
          setPassword,
          company,
          role: roles.find((role) => role.name.includes('admin')),
        }),
      );

      const payload: AuthPayload = { id: user.id };
      const token = this.jwtService.sign(payload);

      const userWithPermissions = Helper.formatPermissions(user);

      return { userWithPermissions, token };
    });

    return transaction;
  }

  async signIn(loginDto: LoginDto) {
    try {
      const { email, password } = loginDto;
      const user = await this.usersService.findOne(email, 'email');
      if (user && (await user.comparePassword(password))) {
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

    if (user.setPassword == true) {
      throw new BadRequestException('Password already set');
    }

    Object.assign(user, { password: newPassword, setPassword: true });
    const updatedUserPassword = await this.userRepo.save(user);

    return updatedUserPassword;
  }

  async requestResetPassword(requestResetPasswordDto: RequestResetPasswordDto) {
    const { email } = requestResetPasswordDto;
    const isEmailExist = await this.userRepo.findOne({ where: { email } })
    // Generate otp
    const otp = await Helper.generateToken();

    // Save to redis
    await this.cacheService.set(email, otp, 600);

    // Send mail
    const createEmailDto: CreateEmailDto = {
      subject: 'Confirm OTP',
      template: 'otp.pug',
      //template: `Your OTP is ${otp}`,
      metaData: {
        code: otp,
      },
      receiverEmail: email,
    }
    this.eventEmitter.emit(AppEvents.SEND_EMAIl, createEmailDto)
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
}
