import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FraudPreventionService } from './fraud-prevention.service';
import { CreateFraudDto, UpdateFraudDto } from './dto/fraud.dto';
import { resolveResponse } from 'src/shared/resolvers';
import { CreateSuspiciousDto, UpdateSuspicipusDto } from './dto/suspicious.dto';
import { CreateDismissalDto, UpdateDismissalDto } from './dto/dismissal.dto';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';

@Controller('fraud-prevention')
export class FraudPreventionController {
  constructor(private readonly fraudPreventionService: FraudPreventionService) {}

  @Post('fraud')
  async createFraud(@Body() createFraudDto: CreateFraudDto) {
    return resolveResponse(this.fraudPreventionService.createFraud(createFraudDto), 'Fraud Created')
  }

  @Post('suspicious')
  async createSuspicious(@Body() createSuspiciousDto: CreateSuspiciousDto) {
    return resolveResponse(this.fraudPreventionService.createSuspicious(createSuspiciousDto), 'Suspicious created')
  }

  @Post('dismissal')
  async createDismissal(@Body() createDismissalDto: CreateDismissalDto) {
    return resolveResponse(this.fraudPreventionService.createDismissal(createDismissalDto), 'Dismissal Created')
  }

  @Get('fraud')
  async getFrauds(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.fraudPreventionService.findFrauds(pagination), 'All fraud');
  }

  @Get('suspicious')
  async getSuspicious(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.fraudPreventionService.findSuspicious(pagination), 'All suspicious');
  }

  @Get('dismissal')
  async getDismissals() {
    return resolveResponse(this.fraudPreventionService.findDismissals(), 'All Dismissal');
  }

  @Get('fraud/:id')
  async getFraud(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.findFraud(id))
  }

  @Get('suspicious/:id')
  async getOneSuspicious(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.findOneSuspicious(id))
  }

  @Get('dismissal/:id')
  async getOneDismissal(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.findOneDismissal(id))
  }

  @Patch('fraud/:id')
  async updateFraud(@Param('id') id: string, @Body() updateFraudDto: UpdateFraudDto) {
    return resolveResponse(this.fraudPreventionService.updateFraud(id, updateFraudDto), 'Updated Fraud');
  }

  @Patch('suspicious/:id')
  async updateSuspicious(@Param('id') id: string, @Body() updateSuspiciousDto: UpdateSuspicipusDto) {
    return resolveResponse(this.fraudPreventionService.updateSuspicious(id, updateSuspiciousDto), 'Updated Suspicious');
  }

  @Patch('dismissal/:id')
  async updateDismissal(@Param('id') id: string, @Body() uppdateDismissalDto: UpdateDismissalDto) {
    return resolveResponse(this.fraudPreventionService.updateDismissal(id, uppdateDismissalDto), 'Updated Dismissal');
  }

  @Delete('fraud/:id')
  async deleteFraud(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteFraud(id), 'Fraud Deleted');
  }

  @Delete('suspicious/:id')
  async deleteSuspicious(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteSuspicious(id), 'Suspicious Deleted');
  }

  @Delete('dismissal/:id')
  async deleteDismissal(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteDismissal(id), 'Dismissal Deleted');
  }
}
