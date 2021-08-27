import { IsOptional, IsString } from 'class-validator';

export class CreateChatroomDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  avatar: string;
}
