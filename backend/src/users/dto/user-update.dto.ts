import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @ApiProperty()
  profile_img: any;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  password_confirmation: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(8)
  @ApiProperty()
  zipcode: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address1: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  address2: string;
}
