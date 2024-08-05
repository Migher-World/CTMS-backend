import { Controller, Get } from '@nestjs/common';
import { AdminService } from './admin.service';
import { resolveResponse } from '../../shared/resolvers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';

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
}
