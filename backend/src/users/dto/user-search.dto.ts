import { IsString, IsOptional } from 'class-validator';

export class UserSearchDto {
  @IsString()
  departure: string;

  @IsString()
  departureDate: string;

  @IsString()
  destination: string;

  @IsString()
  @IsOptional()
  stopovers: string;
}
