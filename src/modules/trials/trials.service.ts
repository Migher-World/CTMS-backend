import { Injectable } from '@nestjs/common';
import { CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Trial } from './entities/trial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class TrialsService extends BasicService<Trial> {
  constructor(@InjectRepository(Trial)
  private readonly trialRepo: Repository<Trial>,
  @InjectRepository(Company)
  private readonly companyRepo: Repository<Company>){
    super(trialRepo, 'Trials');
  }

  async createTrial(createTrialDto: CreateTrialDto, companyId:string ): Promise<Trial> {
    const companies = await this.companyRepo.find({where: {id: companyId}})
    const createdTrial = await this.trialRepo.create({
      ...createTrialDto,
      site: companies.find((company) => company.name),
      companyId: companyId,
    });
    const trial = await this.trialRepo.save(createdTrial);
    return trial;
  }

  async findTrials(pagination: BasicPaginationDto, companyId: string) {
    const query = this.trialRepo.createQueryBuilder('trial');
    query.where('trial.companyId = :companyId', {companyId});
    return this.paginate(query, pagination);
  }


  async findTrial(trialId: string) {
    const id = trialId
    const trial = await this.trialRepo.findOne({where: {id}});
    return trial;
  }

  async updateTrial(trialId: string, updateTrialDto: UpdateTrialDto) {
    const trial = await this.findTrial(trialId);

    if (trial){
      Object.assign(trial, updateTrialDto);
      const updatedTrial = await this.trialRepo.save(trial);
      return updatedTrial;
    }
  }

  async deleteTrial(trialId: string) {
    const trial = await this.findTrial(trialId);

    if (trial){
      await this.trialRepo.delete(trialId);
    }
  }
}
