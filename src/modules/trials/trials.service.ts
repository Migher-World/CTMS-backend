import { BadRequestException, Injectable } from '@nestjs/common';
import { TrialPermissionDto, CreateTrialDto } from './dto/create-trial.dto';
import { UpdateTrialDto } from './dto/update-trial.dto';
import { BasicService } from 'src/shared/services/basic-service.service';
import { Trial } from './entities/trial.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { BasicPaginationDto } from 'src/shared/dto/basic-pagination.dto';
import { User } from '../users/entities/user.entity';
import { ICompany } from '../companies/interfaces/company.interface';
import { TrialPermission } from './entities/trial-permission.entity';
import { AgeGroup, BudgetCategory, ProtocolDetails, TrialPermissions } from './interfaces/trials.interface';
import { Helper } from '../../shared/helpers';
import { Company } from '../companies/entities/company.entity';
import { AppDataSource } from '../../config/db.config';

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
    let sites: Company[] = [];
    if (createTrialDto.siteIds) {
      sites = await this.resolveRelationships(createTrialDto.siteIds, Company);
    }
    const trackingNumber = await this.generateUniqueTrackingId();
    const createdTrial = this.trialRepo.create({
      ...createTrialDto,
      createdById: user.id,
      trackingNumber,
      companyId: company?.id ?? createTrialDto.companyId,
    });
    const trial = await this.trialRepo.save({ ...createdTrial, sites });
    for (const site of sites) {
      await this.assignTrialToSiteAdmin(trial, site, [TrialPermissions.VIEW_TRIAL]);
    }
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

  async findTrials(pagination: BasicPaginationDto, company: ICompany, user: User) {
    // const query = this.trialRepo.createQueryBuilder('trial').leftJoinAndSelect('trial.sites', 'sites');
    // if (company) {
    //   query.where('trial.companyId = :companyId', { companyId: company.id });
    // }
    // return this.paginate(query, pagination);

    // only get the trials that the user has permission to view except for super admins
    let query;
    if (user.role.name.toLowerCase().includes('uctss')) {
      query = this.trialRepo.createQueryBuilder('trial').leftJoinAndSelect('trial.projectManager', 'projectManager');
    } else {
      const permissions = await this.trialPermissionRepo.find({ where: { userId: user.id } });
      const trialIds = permissions.map((permission) => permission.trialId);
      query = this.trialRepo
        .createQueryBuilder('trial')
        .where({ id: In(trialIds) })
        // .leftJoinAndSelect('trial.sites', 'sites')
        .innerJoinAndSelect('trial.sites', 'sites', 'sites.id = :companyId', { companyId: company.id });
    }

    return this.paginate(query, pagination);
  }

  async assignTrialToSiteAdmin(trial: Trial, site: Company, permissions: TrialPermissions[]) {
    // assign a trial to a site and give the site admin permission to view the trial
    if (trial && site) {
      const siteAdmin = await AppDataSource.getRepository(User).findOne({
        where: {
          companyId: site.id,
          role: {
            name: 'site admin',
          },
        },
      });
      for (const permission of permissions) {
        const permissionExists = await this.trialPermissionRepo.findOne({
          where: { trialId: trial.id, userId: siteAdmin.id, permission },
        });
        if (!permissionExists) {
          const trialPermission = this.trialPermissionRepo.create({ trialId: trial.id, userId: siteAdmin.id, permission });
          await this.trialPermissionRepo.save(trialPermission);
        }
      }
      return { message: 'Trial assigned to site successfully' };
    }
    throw new BadRequestException('Trial or site not found');
  }

  async findTrialsByCompany(companyId: string) {
    const trials = await this.trialRepo
      .createQueryBuilder('trial')
      .leftJoinAndSelect('trial.company', 'company')
      .leftJoinAndSelect('trial.vendor', 'vendor')
      .leftJoinAndSelect('trial.sponsor', 'sponsor')
      .leftJoinAndSelect('trial.projectManager', 'projectManager')
      .innerJoinAndSelect('trial.sites', 'sites', 'sites.id = :companyId', { companyId })
      .getMany();
    return trials;
  }

  async findTrial(trialId: string) {
    const id = trialId;
    const trial = await this.findOne(id, 'id', ['sites', 'company', 'vendor', 'sponsor']);
    // const hasPermission = await this.checkPermission(trialId, trial.createdById, TrialPermissions.VIEW_TRIAL);
    // if (!hasPermission) {
    //   throw new BadRequestException('You do not have permission to view this trial');
    // }
    return trial;
  }

  async updateTrial(trialId: string, updateTrialDto: UpdateTrialDto) {
    const trial = await this.findTrial(trialId);

    if (trial) {
      Object.assign(trial, updateTrialDto);
      const updatedTrial = await this.trialRepo.save(trial);
      for (const site of updatedTrial.sites) {
        await this.assignTrialToSiteAdmin(trial, site, [TrialPermissions.VIEW_TRIAL]);
      }
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

  async assignPM(trialId: string, userId: string) {
    const trial = await this.findTrial(trialId);
    if (trial) {
      // assign all permissions to the PM
      trial.projectManagerId = userId;
      await this.trialRepo.save(trial);
      const permissions = Object.values(TrialPermissions);
      for (const permission of permissions) {
        const permissionExists = await this.trialPermissionRepo.findOne({ where: { trialId, userId, permission } });
        if (!permissionExists) {
          const trialPermission = this.trialPermissionRepo.create({ trialId, userId, permission });
          await this.trialPermissionRepo.save(trialPermission);
        }
      }
      return { message: 'PM assigned successfully' };
    }
    throw new BadRequestException('Trial not found');
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

  private async checkPermission(trialId: string, userId: string, permission: TrialPermissions) {
    const trialPermission = await this.trialPermissionRepo.findOne({ where: { trialId, userId, permission } });
    return !!trialPermission;
  }
}
