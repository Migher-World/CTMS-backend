import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { resolveResponse } from '../../shared/resolvers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { Company } from '../companies/entities/company.entity';

@Controller('admin')
@ApiTags('Admin')
@ApiBearerAuth()
@Headers()
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('dashboard')
  getDashboardData() {
    return resolveResponse(this.adminService.getDashboardData());
  }

  @Get('company-dashboard')
  getCompanyDashboardData(@CurrentCompany() company: Company) {
    return resolveResponse(this.adminService.getCompanyDashboardData(company.id));
  }

  @Get('budget-dashboard')
  getBudgetDashboardData(@CurrentCompany() company: Company) {
    return resolveResponse(this.adminService.getCompanyBudgetData(company.id));
  }
}
