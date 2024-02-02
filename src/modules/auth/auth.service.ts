import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload, LoginDto, RegisterDto, ResetPasswordDto} from './auth.dto';
import { JwtService } from '@nestjs/jwt';
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
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService, 
    private usersService: UsersService, 
    private companyService: CompaniesService,
    private cacheService: CacheService) {}
  async signUp(credentials: RegisterDto) {
    const transaction = await AppDataSource.transaction(async (manager) => {
      let { password, email, phoneNumber } = credentials;

      await this.usersService.checkDuplicate({ email, phoneNumber });

      if (!password) {
        password = Helper.randString(3, 2, 6);
      }

      const companyDto: CreateCompanyDto =
        credentials.company.type === CompanyType.INDIVIDUAL || credentials.company.type === CompanyType.SPONSOR
          ? { ...credentials.company, name: `${credentials.firstName}: ${credentials.company.type} Company` }
          : credentials.company;

      const company = await manager.save<Company>(manager.create<Company>(Company, companyDto));
      const roles = await this.companyService.createCompanyDefaultRoles(company);
      const user = await manager.save<User>(manager.create<User>(User, { ...credentials, password, company, role: roles.find((role) => role.name.includes('admin')) }));

      const payload: AuthPayload = { id: user.id };
      const token = this.jwtService.sign(payload);

      return { user, token };
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
        return { user: user.toJSON(), token };
      }
      throw new UnauthorizedException('Invalid Credentials');
    } catch (error) {
      throw new UnauthorizedException('Invalid Credentials');
    }
  }

  async setPassword(setPasswordDto: ResetPasswordDto){
    const {email, password} = setPasswordDto;
    const newPassword = await bcrypt.hash(password, 10)
    const user = await this.userRepo.findOne({ where: { email } });

    if (user.password) {
      throw new UnauthorizedException('Password already set');
    }

    Object.assign(user, {password:newPassword});
    const updatedUserPassword = await this.userRepo.save(user)
  
    return updatedUserPassword;
  }

  async requestResetPassword(email: string){
    const isEmailExist = await this.usersService.findUserByEmail(email)
      // Generate otp
      const otp = Math.floor(1000 + Math.random()*9000);
      console.log(otp)
      // Save to redis
      await this.cacheService.set(email, otp, 600);

      // Send mail
  }
  
  async resetPassword(resetPasswordDto: ResetPasswordDto, otp: string) {
    const {email, password} = resetPasswordDto;
    const newPassword = await bcrypt.hash(password, 10);

    // Retrieve Otp from Cache
    const storedOtp = await this.cacheService.get(email);
    console.log(storedOtp)
    if (otp !== storedOtp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const user = await this.userRepo.findOne({ where: { email } });
    Object.assign(user, {password:newPassword});
    const updatedUserPassword = await this.userRepo.save(user)
  
    return updatedUserPassword;

  }
}
