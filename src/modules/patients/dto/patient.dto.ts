import { IsEnum, IsNotEmpty } from 'class-validator';
import { EnrollmentStatus } from '../interfaces/patient.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Helper } from '../../../shared/helpers';

export class CreatePatientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEnum(EnrollmentStatus)
  @ApiProperty({ enum: EnrollmentStatus })
  enrollmentStatus: EnrollmentStatus;

  @IsNotEmpty()
  @ApiProperty({
    example: Helper.faker.date.birthdate({
      min: 18,
      max: 80,
      mode: 'year',
    }),
  })
  birthDate: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'male' })
  gender: 'male' | 'female';

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.location.country() })
  nationality: string;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.datatype.boolean() })
  consentReceived: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.datatype.boolean() })
  commencedTreatment: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.datatype.boolean() })
  droppedOut: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.datatype.boolean() })
  visitCompleted: boolean;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.datatype.boolean() })
  withinWindow: boolean;
}

export class UpdatePatientDto extends CreatePatientDto {}

export class UpdatePatientStatusDto {
  @IsNotEmpty()
  @IsEnum(EnrollmentStatus)
  @ApiProperty({ enum: EnrollmentStatus })
  status: EnrollmentStatus;

  @IsNotEmpty()
  @ApiProperty({ example: Helper.faker.string.uuid() })
  patientId: string;
}