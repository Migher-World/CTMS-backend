import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Contract } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContractService  extends BasicService<Contract>{
  constructor( 
    @InjectRepository(Contract) private contractRepo: Repository<Contract>){
      super(contractRepo, 'Contracts');
    }

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const createContract = this.contractRepo.create({...createContractDto});
    const contract = await this.contractRepo.save(createContract);
    return contract;
  }

  async findContracts(): Promise<Contract[]> {
   const contract = await this.contractRepo.find();
    return contract;
  }

  async findContract(contractId: string): Promise<Contract> {
    const id = contractId
    const contract = await this.contractRepo.findOne({where: {id}});
    return contract;
  }

  async updateContract(contractId: string, updateContractDto: UpdateContractDto) {
    const contract = await this.findContract(contractId);

    if(contract){
      Object.assign(contract, updateContractDto);
      const updateContract = await this.contractRepo.save(contract);
      return updateContract;
    }
  }

  async deleteContract(contractId: string) {
    const contract = await this.findContract(contractId);

    if (contract){
      await this.contractRepo.delete(contractId);
    }
  }
}
