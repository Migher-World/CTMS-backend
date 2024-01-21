import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCompany = createParamDecorator(
    (data, ctx: ExecutionContext): string => {
        const req = ctx.switchToHttp().getRequest();
        return req.company;
    },
);