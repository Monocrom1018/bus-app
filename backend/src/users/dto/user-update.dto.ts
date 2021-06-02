import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UserUpdateDto {
  profile_img: any;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  password_confirmation: string;

  @IsString()
  @IsOptional()
  @MinLength(4)
  @MaxLength(8)
  zipcode: string;

  @IsString()
  @IsOptional()
  address1: string;

  @IsString()
  @IsOptional()
  address2: string;
}
