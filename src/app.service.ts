import { Injectable } from '@nestjs/common';
import { Helper } from './shared/helpers';
import { ICompany } from './modules/companies/interfaces/company.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async uploadFile(file: Express.Multer.File, company: ICompany): Promise<string> {
    const fileUrl = await Helper.cloudinaryUpload(file, {
      folder: `${company.name}_${company.id}`.toLowerCase().replace(/\s/g, '_'),
      public_id: `company_${Helper.randString(3, 3, 2)}`,
    });
    return fileUrl;
  }
}
