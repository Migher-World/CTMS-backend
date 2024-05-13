import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query } from '@nestjs/common';
import { TrialsService } from './trials.service';
import { CreateTrialDto, TrialPermissionDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from 'src/shared/decorators/headers.decorator';
import { resolveResponse } from 'src/shared/resolvers';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';
import { CurrentCompany } from 'src/shared/decorators/current-company.decorator';
import { Company } from '../companies/entities/company.entity';
import { ICompany } from '../companies/interfaces/company.interface';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@ApiTags('Trials')
@ApiBearerAuth()
@Headers()
@Controller('trials')
export class TrialsController {
  constructor(private readonly trialsService: TrialsService) {}

  @Post()
  create(@Body() createTrialDto: CreateTrialDto, @CurrentUser() user: User, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.trialsService.createTrial(createTrialDto, user, company), 'Trial Created');
  }

  @Get()
  async getTrials(@Query() pagination: BasicPaginationDto, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.trialsService.findTrials(pagination, company.id));
  }

  @Get('metadata')
  async getMetadata() {
    return resolveResponse(this.trialsService.getMetadata());
  }

  @Get(':id')
  async getTrial(@Param('id') id: string) {
    return resolveResponse(this.trialsService.findTrial(id), 'Trial found');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrialDto: UpdateTrialDto) {
    return resolveResponse(this.trialsService.updateTrial(id, updateTrialDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return resolveResponse(this.trialsService.deleteTrial(id), 'Trial Deleted');
  }

  @Get('permissions/:id')
  async getPermissions(@Param('id') id: string, @CurrentUser() user: User){
    return resolveResponse(this.trialsService.getTrialPermissions(id, user.id));
  }

  @Post('permissions/add/:id')
  async addPermission(@Param('id') id: string, @Body() trialPermissionDto: TrialPermissionDto, @CurrentUser() user: User){
    return resolveResponse(this.trialsService.addTrialPermission(id, trialPermissionDto));
  }

  @Post('permissions/remove/:id')
  async removePermission(@Param('id') id: string, @Body() trialPermissionDto: TrialPermissionDto, @CurrentUser() user: User){
    return resolveResponse(this.trialsService.removeTrialPermission(id, trialPermissionDto));
  }
}
