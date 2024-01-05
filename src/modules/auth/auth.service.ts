import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayload, LoginDto, RegisterDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { AppDataSource } from '../../config/db.config';
import { Helper } from '../../shared/helpers';
import { Company } from '../companies/entities/company.entity';
import { CreateCompanyDto } from '../companies/dto/create-company.dto';
import { CompanyCategory } from '../companies/interfaces/company.interface';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private usersService: UsersService) {}

  async signUp(credentials: RegisterDto) {
    const transaction = await AppDataSource.transaction(async (manager) => {
      let { password, email, phoneNumber } = credentials;

      await this.usersService.checkDuplicate({ email, phoneNumber });

      if (!password) {
        password = Helper.randString(3, 2, 6);
      }
      password = await Helper.hash(password);

      const companyDto: CreateCompanyDto =
        credentials.company.type === CompanyCategory.INDIVIDUAL || credentials.company.type === CompanyCategory.SPONSOR
          ? { ...credentials.company, name: `${credentials.firstName}: ${credentials.company.type} Company` }
          : credentials.company;

      const company = await manager.save<Company>(manager.create<Company>(Company, companyDto));
      const user = await manager.save<User>(manager.create<User>(User, { ...credentials, password, company }));

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
  0;
}
