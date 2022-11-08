import { Type } from 'class-transformer';
import { MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class UpdateStoryDto {
    @IsOptional()
    @MinLength(3)
    @MaxLength(150)
    title: string;

    @IsOptional()
    text: string;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    image: number;  
}