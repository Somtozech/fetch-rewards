import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpendPointsDTO {
  @ApiProperty()
  @IsInt()
  points: number;
}
