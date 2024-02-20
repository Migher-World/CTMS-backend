import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { resolveResponse } from 'src/shared/resolvers';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return resolveResponse(this.contractService.create(createContractDto), 'Contract Created');
  }

  @Get()
  findAll() {
    return resolveResponse(this.contractService.findContracts(), 'Contracts Found');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return resolveResponse(this.contractService.findContract(id), 'Contract Found');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return resolveResponse(this.contractService.updateContract(id, updateContractDto), 'Contract Updated');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return resolveResponse(this.contractService.deleteContract(id), 'Contract deleted');
  }
}
