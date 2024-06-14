import { Process, Processor } from '@nestjs/bull';
import { AssignRoleDto } from './dto/assign-role.dto';
import { Job } from 'bull';
import { UsersService } from './users.service';

@Processor('userQueue')
export class UsersConsumer {
  constructor(private readonly userService: UsersService) {}

  @Process('assignRole')
  async assignRole(job: Job<AssignRoleDto>) {
    const { userId, roleId } = job.data;
    const user = await this.userService.findOne(userId);
    user.roleId = roleId;
  }
}
