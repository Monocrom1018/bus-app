import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UserUpdateDto {
  profile_img: any;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  password_confirmation: string;
}
