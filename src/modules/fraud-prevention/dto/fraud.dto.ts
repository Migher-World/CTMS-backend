import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ActivityStatus, Category, FaultNature, SecurityLevel } from "../interfaces/fraud-prevention.interfaces";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateFraudDto {
    @IsNotEmpty()
    @IsEnum(SecurityLevel)
    @ApiProperty({enum: SecurityLevel})
    securityLevel: SecurityLevel;

    @IsNotEmpty()
    reporterName: string;

    @IsNotEmpty()
    reporterEmail: string;

    @IsNotEmpty()
    reporterContact: string;

    @IsNotEmpty()
    @IsEnum(Category)
    @ApiProperty({enum: Category})
    category: Category;

    @IsNotEmpty()
    @IsEnum(ActivityStatus)
    @ApiProperty({enum: ActivityStatus})
    status: ActivityStatus;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    participantId: string;

    @IsNotEmpty()
    trialId: string;

    @IsNotEmpty()
    details: string;

    @IsNotEmpty()
    @IsEnum(FaultNature)
    @ApiProperty({enum: FaultNature})
    natureOfFraud: FaultNature;

    @IsOptional()
    witnessName: string;

    @IsOptional()
    witnessContact: string;

    @IsOptional()
    relevantInformation: string;

    @IsOptional()
    documents: string;
    
    @IsOptional()
    actionTaken: string;
}

export class UpdateFraudDto extends PartialType(CreateFraudDto){
    @IsNotEmpty()
    @IsOptional()
    witnessName?: string;

    @IsNotEmpty()
    @IsOptional()
    witnessContact?: string;

    @IsNotEmpty()
    @IsOptional()
    relevantInformation?: string;
    
    @IsNotEmpty()
    @IsOptional()
    actionTaken?: string;
}

export class FilterFraudDto extends PartialType(CreateFraudDto){
    @IsOptional()
    @IsEnum(Category)
    @ApiProperty({enum: Category})
    category: Category;

    @IsOptional()
    @IsEnum(SecurityLevel)
    @ApiProperty({enum: SecurityLevel})
    securityLevel: SecurityLevel;

    @IsOptional()
    @IsEnum(ActivityStatus)
    @ApiProperty({enum: ActivityStatus})
    status: ActivityStatus;
}
