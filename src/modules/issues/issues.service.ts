import { BadRequestException, Injectable } from '@nestjs/common';
import { BasicService } from '../../shared/services/basic-service.service';
import { Issue, IssueStatus } from './entities/issues.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ICompany } from '../companies/interfaces/company.interface';
import { CreateIssueDto, FilterIssueDto, UpdateIssueDto } from './dto/issue.dto';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { CreateCommentDto } from './dto/comment.dto';
import { Comment } from './entities/comment.entity';
import { AppDataSource } from '../../config/db.config';

@Injectable()
export class IssuesService extends BasicService<Issue> {
  constructor(
    @InjectRepository(Issue) private readonly issueRepo: Repository<Issue>,
    @InjectRepository(Comment) private readonly commentRepo: Repository<Comment>,
  ) {
    super(issueRepo, 'Issues');
  }

  async create(payload: CreateIssueDto, company: ICompany, user: User): Promise<Issue> {
    const assignedTo = await AppDataSource.getRepository(User).findOne({
      where: { email: payload.assignedToId },
    });
    if (!assignedTo) {
      throw new BadRequestException('Assigned user not found');
    }
    const issue = this.issueRepo.create({
      ...payload,
      companyId: company.id,
      authorId: user.id,
    });
    return this.issueRepo.save(issue);
  }

  async findAll(pagination: BasicPaginationDto, filterIssueDto: FilterIssueDto, companyId: string) {
    const { status, assignedToId, authorId } = filterIssueDto;
    const query = this.issueRepo.createQueryBuilder('issue');
    query.where('issue.companyId = :companyId', { companyId });
    if (status) {
      query.andWhere('issue.status = :status', { status });
    }
    if (assignedToId) {
      query.andWhere('issue.assignedToId = :assignedToId', { assignedToId });
    }
    if (authorId) {
      query.andWhere('issue.authorId = :authorId', { authorId });
    }
    query.orderBy('issue.createdAt', 'DESC');
    return this.paginate(query, pagination);
  }

  async findSingleIssue(id: string): Promise<Issue> {
    return this.findOne(id);
  }

  async update(id: string, payload: UpdateIssueDto): Promise<Issue> {
    const issue = await this.findOne(id);
    await this.issueRepo.save({ ...issue, ...payload });
    return issue;
  }

  async updateIssueStatus(id: string, status: IssueStatus): Promise<Issue> {
    const issue = await this.findOne(id);
    issue.status = status;
    return issue.save();
  }

  async delete(id: string): Promise<void> {
    await this.issueRepo.delete(id);
  }

  async createComment(payload: CreateCommentDto, author: User) {
    const issue = await this.findOne(payload.issueId);
    const comment = this.commentRepo.create({
      ...payload,
      authorId: author.id,
    });
    return this.commentRepo.save(comment);
  }

  async getOverview(companyId: string) {
    const query = this.issueRepo.createQueryBuilder('issue');
    query.where('issue.companyId = :companyId', { companyId });
    const total = await query.getCount();
    const open = await query.andWhere('issue.status = :status', { status: IssueStatus.OPEN }).getCount();
    const inProgress = await query.andWhere('issue.status = :status', { status: IssueStatus.IN_PROGRESS }).getCount();
    const done = await query.andWhere('issue.status = :status', { status: IssueStatus.DONE }).getCount();
    return { total, open, inProgress, done };
  }
}
