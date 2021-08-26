import { IsOptional } from 'class-validator';

export class CreateUserChatroomDto {
  @IsOptional()
  user_id: number;
}
