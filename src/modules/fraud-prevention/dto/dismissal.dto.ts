import { IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { FaultNature } from "../interfaces/fraud-prevention.interfaces";
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateDismissalDto {
    @IsNotEmpty()
    caseId: string;

    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    time: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    summary: string;

    @IsNotEmpty()
    @IsEnum(FaultNature)
    @ApiProperty({enum: FaultNature})
    natureOfFraud: FaultNature;

    @IsOptional()
    participantId: string;

    @IsOptional()
    participantsDetail: string;

    @IsOptional()
    dismissalReason: string;

    @IsOptional()
    supportingEvidence: string;

    @IsOptional()
    actionTaken: string;  
}

export class UpdateDismissalDto extends PartialType(CreateDismissalDto) {
    @IsOptional()
    description: string;

    @IsOptional()
    summary: string;

    @IsOptional()
    dismissalReason: string;

    @IsOptional()
    actionTaken: string;  
}