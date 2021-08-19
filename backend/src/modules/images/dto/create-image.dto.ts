import { IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  key: string;

  @IsString()
  imagable_id: string;

  @IsString()
  imagable_type: string;

  @IsString()
  image_type: string;

  @IsString()
  uuid: string;
}
