import { IsString, IsInt, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddTransactionDTO {
  @ApiProperty()
  @IsString()
  payer: string;

  @ApiProperty()
  @IsInt()
  points: number;

  @ApiProperty()
  @IsDateString()
  timestamp: string;
}
