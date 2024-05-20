import { BadRequestException, Injectable } from '@nestjs/common';
import { TrialPermissionDto, CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Trial } from './entities/trial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';
import { User } from '../users/entities/user.entity';
import { ICompany } from '../companies/interfaces/company.interface';
import { TrialPermission } from './entities/trial-permission.entity';
import { AgeGroup, BudgetCategory, ProtocolDetails, TrialPermissions } from './interfaces/trials.interface';
import { Helper } from '../../shared/helpers';
import { Company } from '../companies/entities/company.entity';

@Injectable()
export class TrialsService extends BasicService<Trial> {
  constructor(
    @InjectRepository(Trial)
    private readonly trialRepo: Repository<Trial>,
    @InjectRepository(TrialPermission)
    private readonly trialPermissionRepo: Repository<TrialPermission>,
  ) {
    super(trialRepo, 'Trials');
  }

  async createTrial(createTrialDto: CreateTrialDto, user: User, company: ICompany): Promise<Trial> {
    if (!company && !createTrialDto.companyId) {
      throw new Error('companyId is required to create a patient as a super admin');
    }
    const sites = await this.resolveRelationships(createTrialDto.siteIds, Company);
    const trackingNumber = await this.generateUniqueTrackingId();
    const createdTrial = this.trialRepo.create({
      ...createTrialDto,
      createdById: user.id,
      trackingNumber,
      companyId: company?.id ?? createTrialDto.companyId,
    });
    const trial = await this.trialRepo.save({ ...createdTrial, sites });
    return trial;
  }

  private async generateUniqueTrackingId() {
    const trackingNumber = `TRIAL-${Helper.generateToken(6)}`;
    const trial = await this.trialRepo.findOne({ where: { trackingNumber } });
    if (trial) {
      return this.generateUniqueTrackingId();
    }
    return trackingNumber;
  }

  async findTrials(pagination: BasicPaginationDto, company: ICompany) {
    const query = this.trialRepo.createQueryBuilder('trial');
    if (company) {
      query.where('trial.companyId = :companyId', { companyId: company.id });
    }
    return this.paginate(query, pagination);
  }

  async findTrial(trialId: string) {
    const id = trialId;
    const trial = await this.trialRepo.findOne({ where: { id } });
    return trial;
  }

  async updateTrial(trialId: string, updateTrialDto: UpdateTrialDto) {
    const trial = await this.findTrial(trialId);

    if (trial) {
      Object.assign(trial, updateTrialDto);
      const updatedTrial = await this.trialRepo.save(trial);
      return updatedTrial;
    }
  }

  async deleteTrial(trialId: string) {
    const trial = await this.findTrial(trialId);

    if (trial) {
      await this.trialRepo.delete(trialId);
    }
  }

  async getTrialPermissions(trialId: string, userId: string) {
    const permissions = await this.trialPermissionRepo.find({ where: { trialId, userId } });
    return permissions;
  }

  async addTrialPermission(trialId: string, payload: TrialPermissionDto) {
    const { userId, permissions } = payload;
    for (const permission of permissions) {
      if (!Object.values(TrialPermissions).includes(permission)) {
        throw new BadRequestException('Invalid permission');
      }
      const permissionExists = await this.trialPermissionRepo.findOne({ where: { trialId, userId, permission } });
      if (!permissionExists) {
        const trialPermission = this.trialPermissionRepo.create({ trialId, userId, permission });
        await this.trialPermissionRepo.save(trialPermission);
      }
    }
    return { message: 'Permissions added successfully' };
  }

  async removeTrialPermission(trialId: string, payload: TrialPermissionDto) {
    const { userId, permissions } = payload;
    for (const permission of permissions) {
      if (!Object.values(TrialPermissions).includes(permission)) {
        throw new BadRequestException('Invalid permission');
      }
      await this.trialPermissionRepo.delete({ trialId, userId, permission });
    }
    return { message: 'Permissions removed successfully' };
  }

  async getMetadata() {
    const metadata = {
      protocolDetails: Object.entries(ProtocolDetails).map(([key, value]) => ({ key, value })),
      ageGroups: Object.entries(AgeGroup).map(([key, value]) => ({ key, value })),
      budgetCategories: Object.entries(BudgetCategory).map(([key, value]) => ({ key, value })),
      permissions: Object.entries(TrialPermissions).map(([key, value]) => ({
        key: Helper.convertSnakeToSentence(key),
        value,
      })),
    };
    return metadata;
  }
}
