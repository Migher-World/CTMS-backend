import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './entities/contract.entity';
import { Cloudinary } from 'src/shared/plugins/cloud-storage/cloudinary';

@Module({
  imports: [TypeOrmModule.forFeature([Contract])],
  controllers: [ContractController],
  providers: [ContractService, Cloudinary]
})
export class ContractModule {}
