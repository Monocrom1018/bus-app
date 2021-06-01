import { IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  profile_img: string;

  @IsString()
  @MinLength(8)
  @MaxLength(80)
  password: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password_confirmation: string;
}
