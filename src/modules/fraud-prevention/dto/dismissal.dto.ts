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

    @IsNotEmpty()
    participantId: string;

    @IsNotEmpty()
    participantsDetail: string;

    @IsNotEmpty()
    dismissalReason: string;

    @IsNotEmpty()
    @IsOptional()
    actionTaken: string;  
}

export class UpdateDismissalDto extends PartialType(CreateDismissalDto) {
    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    summary: string;

    @IsNotEmpty()
    dismissalReason: string;

    @IsNotEmpty()
    @IsOptional()
    actionTaken: string;  
}