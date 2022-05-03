import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SpendPointsDTO {
  @ApiProperty()
  @IsInt()
  @Min(1)
  points: number;
}
