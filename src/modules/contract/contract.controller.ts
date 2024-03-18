import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { resolveResponse } from 'src/shared/resolvers';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  async create(@Body() createContractDto: CreateContractDto) {
    return resolveResponse(this.contractService.createContract(createContractDto), 'Contract Created');
  }

  @Get()
  async getContracts() {
    return resolveResponse(this.contractService.findContracts(), 'Contracts Found');
  }

  @Get(':id')
  async getContract(@Param('id') id: string) {
    return resolveResponse(this.contractService.findContract(id), 'Contract Found');
  }

  @Patch(':id')
  async updateContract(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return resolveResponse(this.contractService.updateContract(id, updateContractDto), 'Contract Updated');
  }

  @Patch('update-status/:id')
  async updateContractStatus(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return resolveResponse(this.contractService.updateContractStatus(id, updateContractDto), 'Contract Updated');
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return resolveResponse(this.contractService.deleteContract(id), 'Contract deleted');
  }
}
