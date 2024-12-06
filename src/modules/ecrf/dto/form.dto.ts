import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

type ItemType = 'string' | 'number' | 'boolean' | 'array' | 'dropdown';
type PropertyType = 'textfield' | 'dropdown' | 'checkbox' | 'radio' | 'textarea' | 'number' | 'date' | 'time';

// form schema interface
export interface FormSchema {
  type: string;
  title: string;
  properties: {
    [key: string]: {
      type: PropertyType;
      title: string;
      enum?: string[];
      items?: {
        type: ItemType;
        enum: string[];
      };
    };
  };
  required: string[];
}

// form response interface
export interface IFormResponse {
  [key: string]: string | number | boolean | string[];
}

export class FormDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  trialId: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'object',
    example: {
      type: 'object',
      title: 'Form',
      properties: {
        name: {
          type: 'textfield',
          title: 'Name',
        },
        age: {
          type: 'textarea',
          title: 'Age',
        },
        gender: {
          type: 'string',
          title: 'Gender',
          enum: ['Male', 'Female'],
        },
        items: {
          type: 'dropdown',
          title: 'Items',
          items: {
            type: 'string',
            enum: ['item1', 'item2', 'item3'],
          },
        },
      },
      required: ['name', 'age'],
    },
  })
  schema: FormSchema;
}

export class FormResponseDto {
  @IsNotEmpty()
  response: IFormResponse;

  @IsNotEmpty()
  formId: string;
}

// form schema example
// export const formSchemaExample: FormSchema = {
//   type: 'object',
//   title: 'Form',
//   properties: {
//     name: {
//       type: 'string',
//       title: 'Name',
//     },
//     age: {
//       type: 'number',
//       title: 'Age',
//     },
//     type: {
//       type: 'string',
//       title: 'Type',
//       enum: ['A', 'B', 'C'],
//     },
//     items: {
//       type: 'array',
//       title: 'Items',
//       items: {
//         type: 'string',
//         enum: ['item1', 'item2', 'item3'],
//       },
//     },
//   },
//   required: ['name', 'age'],
// };
