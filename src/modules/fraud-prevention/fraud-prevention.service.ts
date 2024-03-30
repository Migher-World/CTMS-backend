import { BasicService } from 'src/shared/services/basic-service.service';
import { FraudPrevention } from './entities/fraud.entity';
import { CreateFraudDto, UpdateFraudDto } from './dto/fraud.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Suspicious } from './entities/suspicious.entity';
import { Injectable } from '@nestjs/common';
import { Dismissal } from './entities/dismissal.entity';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';
import { CreateSuspiciousDto, UpdateSuspicipusDto } from './dto/suspicious.dto';
import { CreateDismissalDto, UpdateDismissalDto } from './dto/dismissal.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FraudPreventionService extends BasicService<FraudPrevention> {
  constructor(
    @InjectRepository(FraudPrevention) private readonly fraudRepo: Repository<FraudPrevention>,
    @InjectRepository(Suspicious) private readonly suspiciousRepo: Repository<Suspicious>,
    @InjectRepository(Dismissal) private readonly dismissalRepo: Repository<Dismissal>,
  ){
    super(fraudRepo, 'Frauds');
  }

  async createFraud (createFraudDto: CreateFraudDto, user: User) {
    const createdFraud = await this.fraudRepo.create({
      ...createFraudDto,
      createdById: user.id
    });

    const fraud = await this.fraudRepo.save(createdFraud);
    return fraud;
  }

  async findFrauds(pagination: BasicPaginationDto) {
   const query = this.fraudRepo.createQueryBuilder('fraud');

   return this.paginate(query,pagination);
  }

  async findFraud(fraudId: string) {
    const id = fraudId;
    const fraud = await this.fraudRepo.findOne({where: {id}});
    return fraud
  }

  async updateFraud(fraudId: string, updateFraudDto: UpdateFraudDto) {
    const fraud = await this.findFraud(fraudId);

    if (fraud){
      Object.assign(fraud, updateFraudDto);
      const updatedFraud = await this.fraudRepo.save(fraud);
      return updatedFraud;
    }
}

  async deleteFraud(fraudId: string) {
    const fraud = await this.findFraud(fraudId);

    if (fraud){
      await this.fraudRepo.delete(fraudId);
    }
  }

  //Suspicious
  async createSuspicious (createSuspiciousDto: CreateSuspiciousDto,  user: User) {
    const createdSuspicious = await this.suspiciousRepo.create({
      ...createSuspiciousDto,
      createdById: user.id
    });

    const suspicious = await this.suspiciousRepo.save(createdSuspicious);
    return suspicious;
  }

  async findSuspicious(pagination: BasicPaginationDto) {
   const query = this.suspiciousRepo.createQueryBuilder('suspicious');

   return this.paginate(query,pagination);
  }

  async findOneSuspicious(suspiciousId: string) {
    const id = suspiciousId;
    const suspicious = await this.suspiciousRepo.findOne({where: {id}});
    return suspicious
  }

  async updateSuspicious(suspiciousId: string, updateSuspiciousDto: UpdateSuspicipusDto) {
    const suspicious = await this.findOneSuspicious(suspiciousId);

    if (suspicious){
      Object.assign(suspicious, updateSuspiciousDto);
      const updatedSuspicious = await this.suspiciousRepo.save(suspicious);
      return updatedSuspicious;
    }
}

  async deleteSuspicious(suspiciousId: string) {
    const suspicious = await this.findOneSuspicious(suspiciousId);

    if (suspicious){
      await this.suspiciousRepo.delete(suspiciousId);
    }
  }

  // Dismissal
  async createDismissal (createDismissalDto: CreateDismissalDto) {
    const createdDismissal = await this.dismissalRepo.create({...createDismissalDto});

    const dismissal = await this.dismissalRepo.save(createdDismissal);
    return dismissal;
  }

  async findDismissals() {
   const dismissals = await this.dismissalRepo.find();
   return dismissals;
  }

  async findOneDismissal(dismissalId: string) {
    const id = dismissalId;
    const dismissal = await this.dismissalRepo.findOne({where: {id}});
    return dismissal
  }

  async updateDismissal(dismissalId: string, updateDismissalDto: UpdateDismissalDto) {
    const dismissal = await this.findOneDismissal(dismissalId);

    if (dismissal){
      Object.assign(dismissal, updateDismissalDto);
      const updatedDismissals = await this.dismissalRepo.save(dismissal);
      return updatedDismissals;
    }
}

  async deleteDismissal(dismissalId: string) {
    const dismissal = await this.findOneDismissal(dismissalId);

    if (dismissal){
      await this.dismissalRepo.delete(dismissalId);
    }
  }
}
