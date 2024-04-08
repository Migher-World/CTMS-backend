import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { ActivityStatus, Category, FaultNature, SecurityLevel } from "../interfaces/fraud-prevention.interfaces";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateSuspiciousDto {
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

    @IsOptional()
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

export class UpdateSuspicipusDto extends PartialType(CreateSuspiciousDto){
    @IsOptional()
    details: string;
    
    @IsOptional()
    witnessName: string;

    @IsOptional()
    witnessContact: string;

    @IsOptional()
    relevantInformation: string;
    
    @IsOptional()
    actionTaken: string;
}

export class FilterSuspiciousDto extends PartialType(CreateSuspiciousDto){
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
