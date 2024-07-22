import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EcrfService } from './ecrf.service';
import { FormDto, FormResponseDto } from './dto/form.dto';
import { resolveResponse } from '../../shared/resolvers';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Headers } from '../../shared/decorators/headers.decorator';

@ApiTags('eCRF')
@ApiBearerAuth()
@Headers()
@Controller('ecrf')
export class EcrfController {
  constructor(private readonly ecrfService: EcrfService) {}

  @Post()
  createForm(@Body() payload: FormDto) {
    return resolveResponse(this.ecrfService.createForm(payload));
  }

  @Get()
  getForms() {
    return resolveResponse(this.ecrfService.getForms());
  }

  @Get(':formId')
  getForm(@Param('formId') formId: string) {
    return resolveResponse(this.ecrfService.getForm(formId));
  }

  @Post('/response/save')
  saveResponse(@Body() payload: FormResponseDto) {
    return resolveResponse(this.ecrfService.saveResponse(payload));
  }
}
