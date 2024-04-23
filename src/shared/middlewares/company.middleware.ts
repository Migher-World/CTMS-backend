import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Company } from '../../modules/companies/entities/company.entity';

@Injectable()
export class CompanyMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    const { headers } = req;
    const companyId = headers['x-company-id'];

    if (!companyId) {
      // return res.status(400).json({ error: 'x-company-id header is required' });
      throw new BadRequestException('x-company-id header is required');
    }

    const company = await Company.findOne({ where: { id: companyId } });
    if (!company) {
      throw new BadRequestException('invalid company id');
    }
    req.company = company;

    next();
  }
}
