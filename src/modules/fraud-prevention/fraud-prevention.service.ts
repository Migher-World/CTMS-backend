import { Injectable } from '@nestjs/common';
import { CreateFraudPreventionDto } from './dto/fraud.dto';
import { UpdateFraudPreventionDto } from './dto/suspicious.dto';

@Injectable()
export class FraudPreventionService {
  create(createFraudPreventionDto: CreateFraudPreventionDto) {
    return 'This action adds a new fraudPrevention';
  }

  findAll() {
    return `This action returns all fraudPrevention`;
  }

  findOne(id: number) {
    return `This action returns a #${id} fraudPrevention`;
  }

  update(id: number, updateFraudPreventionDto: UpdateFraudPreventionDto) {
    return `This action updates a #${id} fraudPrevention`;
  }

  remove(id: number) {
    return `This action removes a #${id} fraudPrevention`;
  }
}
