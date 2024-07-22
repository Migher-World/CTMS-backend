import { Module } from '@nestjs/common';
import { EcrfService } from './ecrf.service';
import { EcrfController } from './ecrf.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FormEntity } from './entities/form.entity';
import { FormResponse } from './entities/form-response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FormEntity, FormResponse])],
  controllers: [EcrfController],
  providers: [EcrfService]
})
export class EcrfModule {}
