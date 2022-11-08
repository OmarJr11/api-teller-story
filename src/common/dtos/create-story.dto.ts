import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, MaxLength, IsEmpty, IsNumber } from 'class-validator';

export class CreateStoryDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  title: string;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  image: number;

  @IsEmpty()
  status?: string;
}
