import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ICompany } from '../companies/interfaces/company.interface';
import { CreateIssueDto, FilterIssueDto, UpdateIssueDto, UpdateIssueStatusDto } from './dto/issue.dto';
import { User } from '../users/entities/user.entity';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { IssueStatus } from './entities/issues.entity';
import { CreateCommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';
import { resolveResponse } from '../../shared/resolvers';

@ApiTags('Issues')
@ApiBearerAuth()
@Headers()
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto, @CurrentUser() user: User, @CurrentCompany() company: ICompany) {
    return resolveResponse(this.issuesService.create(createIssueDto, company, user), 'Issue Created');
  }

  @Get()
  findAll(
    @Query() pagination: BasicPaginationDto,
    @CurrentCompany() company: ICompany,
    @Query() filterIssueDto: FilterIssueDto,
  ) {
    return resolveResponse(this.issuesService.findAll(pagination, filterIssueDto, company));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return resolveResponse(this.issuesService.findSingleIssue(id), 'Issue Found');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return resolveResponse(this.issuesService.update(id, updateIssueDto), 'Issue Updated');
  }

  @Post(':id/status')
  updateStatus(@Param('id') id: string, @Body() status: UpdateIssueStatusDto) {
    return resolveResponse(this.issuesService.updateIssueStatus(id, status.status), 'Issue Status Updated');
  }

  @Delete(':id/delete')
  delete(@Param('id') id: string) {
    return resolveResponse(this.issuesService.delete(id), 'Issue Deleted');
  }

  @Post('comments/create')
  createComment(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User) {
    return resolveResponse(this.issuesService.createComment(createCommentDto, user), 'Comment Created');
  }

  @Get('get/overview')
  getOverview(@CurrentCompany() company: ICompany) {
    return resolveResponse(this.issuesService.getOverview(company));
  }
}
