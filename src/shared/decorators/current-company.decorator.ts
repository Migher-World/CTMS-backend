import { BadRequestException, createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCompany = createParamDecorator((data, ctx: ExecutionContext): string => {
  const req = ctx.switchToHttp().getRequest();
  if (req.user && req.user.companyId !== req.company.id) {
    throw new BadRequestException('Company not found');
  }
  const userRole = req.user.role.name;
  if (userRole === 'individual admin' || userRole === 'utcss admin') {
    return undefined;
  }
  return req.company;
});
