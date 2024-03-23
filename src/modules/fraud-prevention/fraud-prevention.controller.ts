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
    return resolveResponse(this.fraudPreventionService.createFraud(createFraudDto))
  }

  @Post('suspicious')
  async createSuspicious(@Body() createSuspiciousDto: CreateSuspiciousDto) {
    return resolveResponse(this.fraudPreventionService.createSuspicious(createSuspiciousDto))
  }

  @Post('dismissal')
  async createDismissal(@Body() createDismissalDto: CreateDismissalDto) {
    return resolveResponse(this.fraudPreventionService.createDismissal(createDismissalDto))
  }

  @Get('fraud')
  async getFrauds(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.fraudPreventionService.findFrauds(pagination));
  }

  @Get('suspicious')
  async getSuspicious(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.fraudPreventionService.findSuspicious(pagination));
  }

  @Get('dismissal')
  async getDismissals(@Query() pagination: BasicPaginationDto) {
    return resolveResponse(this.fraudPreventionService.findDismissals(pagination));
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
    return resolveResponse(this.fraudPreventionService.updateFraud(id, updateFraudDto));
  }

  @Patch('suspicious/:id')
  async updateSuspicious(@Param('id') id: string, @Body() updateSuspiciousDto: UpdateSuspicipusDto) {
    return resolveResponse(this.fraudPreventionService.updateSuspicious(id, updateSuspiciousDto));
  }

  @Patch('dismissal/:id')
  async updateDismissal(@Param('id') id: string, @Body() uppdateDismissalDto: UpdateDismissalDto) {
    return resolveResponse(this.fraudPreventionService.updateDismissal(id, uppdateDismissalDto));
  }

  @Delete('fraud/:id')
  async deleteFraud(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteFraud(id));
  }

  @Delete('suspicious/:id')
  async deleteSuspicious(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteSuspicious(id));
  }

  @Delete('dismissal/:id')
  async deleteDismissal(@Param('id') id: string) {
    return resolveResponse(this.fraudPreventionService.deleteDismissal(id));
  }
}
