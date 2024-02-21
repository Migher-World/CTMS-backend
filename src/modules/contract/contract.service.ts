import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Contract } from './entities/contract.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cloudinary } from 'src/shared/plugins/cloud-storage/cloudinary';

@Injectable()
export class ContractService extends BasicService<Contract>{
  constructor( 
    @InjectRepository(Contract)
    private contractRepo: Repository<Contract>,
    private cloudinary: Cloudinary){
      super(contractRepo, 'Contracts');
    }

  async createContract(createContractDto: CreateContractDto): Promise<Contract> {
    const {attachments} = createContractDto;
    const uploadedAttachments = await Promise.all(
      attachments.map(async(attachment) =>{
        const {path} = attachment;
        const uploadedFile = await this.cloudinary.uploadFile(path);
        return uploadedFile
      })
    )
    const createdContract = this.contractRepo.create({...createContractDto, attachments: uploadedAttachments});
    const contract = await this.contractRepo.save(createdContract);
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
