import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReviewUpdateDto {
  @IsString()
  @ApiProperty({
    description: 'content of review'
  })
  content: string;

  @IsNumber()
  @ApiProperty({
    description: 'rating of review'
  })
  rating: number;
}
