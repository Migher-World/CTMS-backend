import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CurrentCompany } from '../../shared/decorators/current-company.decorator';
import { CurrentUser } from '../../shared/decorators/current-user.decorator';
import { ICompany } from '../companies/interfaces/company.interface';
import { CreateIssueDto, FilterIssueDto } from './dto/issue.dto';
import { User } from '../users/entities/user.entity';
import { BasicPaginationDto } from '../../shared/dto/basic-pagination.dto';
import { IssueStatus } from './entities/issues.entity';
import { CreateCommentDto } from './dto/comment.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';

@ApiTags('Issues')
@ApiBearerAuth()
@Headers()
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @Post()
  create(@Body() createIssueDto: CreateIssueDto, @CurrentUser() user: User, @CurrentCompany() company: ICompany) {
    return this.issuesService.create(createIssueDto, company, user);
  }

  @Get()
  findAll(
    @Query() pagination: BasicPaginationDto,
    @CurrentCompany() company: ICompany,
    @Query() filterIssueDto: FilterIssueDto,
  ) {
    return this.issuesService.findAll(pagination, filterIssueDto, company.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findSingleIssue(id);
  }

  @Post(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: CreateIssueDto) {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Post(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: IssueStatus) {
    return this.issuesService.updateIssueStatus(id, status);
  }

  @Post(':id/delete')
  delete(@Param('id') id: string) {
    return this.issuesService.delete(id);
  }

  @Post('comments/create')
  createComment(@Body() createCommentDto: CreateCommentDto, @CurrentUser() user: User) {
    return this.issuesService.createComment(createCommentDto, user);
  }
}
