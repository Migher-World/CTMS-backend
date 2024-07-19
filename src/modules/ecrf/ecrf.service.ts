import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Form } from './entities/form.entity';
import { Repository } from 'typeorm';
import { FormDto, FormResponseDto, FormSchema, IFormResponse } from './dto/form.dto';
import { FormResponse } from './entities/form-response.entity';

@Injectable()
export class EcrfService {
  constructor(
    @InjectRepository(Form)
    private formRepo: Repository<Form>,
    @InjectRepository(FormResponse)
    private formResponseRepo: Repository<FormResponse>,
  ) {}

  async saveResponse(payload: FormResponseDto): Promise<FormResponse> {
    const form = await this.formRepo.findOne({ where: { id: payload.formId } });
    if (!form) {
      throw new BadRequestException('Form not found');
    }
    this.validateResponse(form.schema, payload.response);

    const createdResponse = this.formResponseRepo.create({ ...payload, form });
    const formResponse = await this.formResponseRepo.save(createdResponse);

    return formResponse;
  }

  async createForm(payload: FormDto): Promise<Form> {
    this.validateSchema(payload.schema);

    const createdForm = this.formRepo.create({ ...payload });
    const form = await this.formRepo.save(createdForm);

    return form;
  }

  async editForm(formId: string, payload: FormDto): Promise<Form> {
    this.validateSchema(payload.schema);

    const form = await this.formRepo.findOne({ where: { id: formId } });
    if (!form) {
      throw new BadRequestException('Form not found');
    }

    Object.assign(form, payload);
    const updatedForm = await this.formRepo.save(form);

    return updatedForm;
  }

  async getForm(formId: string): Promise<Form> {
    const form = await this.formRepo.findOne({ where: { id: formId } });
    if (!form) {
      throw new BadRequestException('Form not found');
    }

    return form;
  }

  async getForms(): Promise<Form[]> {
    const forms = await this.formRepo.find();
    return forms;
  }

  async deleteForm(formId: string): Promise<void> {
    const form = await this.formRepo.findOne({ where: { id: formId } });
    if (!form) {
      throw new BadRequestException('Form not found');
    }

    await this.formRepo.delete(formId);
  }

  private validateSchema(schema: FormSchema) {
    const { properties, required } = schema;
    const keys = Object.keys(properties);

    // check if all required fields are present
    const missingFields = required.filter((field) => !keys.includes(field));
    if (missingFields.length) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // check if all fields are valid
    keys.forEach((key) => {
      const field = properties[key];
      if (!field.type || !field.title) {
        throw new BadRequestException(`Invalid field: ${key}`);
      }

      if (field.type === 'dropdown' && (!field.items || !field.items.type || !field.items.enum)) {
        throw new BadRequestException(`Invalid dropdown field: ${key}`);
      }
    });
  }

  private validateResponse(schema: FormSchema, response: IFormResponse) {
    const { properties, required } = schema;
    const keys = Object.keys(properties);

    // check if all required fields are present
    const missingFields = required.filter((field) => !keys.includes(field));
    if (missingFields.length) {
      throw new BadRequestException(`Missing required fields: ${missingFields.join(', ')}`);
    }

    // check if all fields are valid
    keys.forEach((key) => {
      const field = properties[key];
      if (!field.type || !field.title) {
        throw new BadRequestException(`Invalid field: ${key}`);
      }

      if (field.type === 'dropdown' && (!field.items || !field.items.type || !field.items.enum)) {
        throw new BadRequestException(`Invalid dropdown field: ${key}`);
      }

      if (!response[key]) {
        throw new BadRequestException(`Missing response field: ${key}`);
      }

      if (field.type === 'dropdown' && !field.items.enum.includes(response[key] as any)) {
        throw new BadRequestException(`Invalid response field: ${key}`);
      }

      if (field.type !== 'dropdown' && typeof response[key] !== field.type) {
        throw new BadRequestException(`Invalid response field: ${key}`);
      }
    });
  }
}
