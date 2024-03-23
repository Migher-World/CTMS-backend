import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FraudPreventionService } from './fraud-prevention.service';
import { CreateFraudPreventionDto } from './dto/fraud.dto';
import { UpdateFraudPreventionDto } from './dto/suspicious.dto';

@Controller('fraud-prevention')
export class FraudPreventionController {
  constructor(private readonly fraudPreventionService: FraudPreventionService) {}

  @Post()
  create(@Body() createFraudPreventionDto: CreateFraudPreventionDto) {
    return this.fraudPreventionService.create(createFraudPreventionDto);
  }

  @Get()
  findAll() {
    return this.fraudPreventionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fraudPreventionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFraudPreventionDto: UpdateFraudPreventionDto) {
    return this.fraudPreventionService.update(+id, updateFraudPreventionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fraudPreventionService.remove(+id);
  }
}
