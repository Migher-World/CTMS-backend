import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  use(req: any, res: Response, next: NextFunction) {
    const { headers } = req;
    const companyId = headers['x-company-id'];

    if (!companyId) {
      // return res.status(400).json({ error: 'x-company-id header is required' });
      throw new BadRequestException('x-company-id header is required');
    }

    req.companyId = companyId;

    next();
  }
}
