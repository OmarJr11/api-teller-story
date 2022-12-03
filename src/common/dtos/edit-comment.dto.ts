import { IsOptional } from 'class-validator';

export class UpdateCommentDto {
    @IsOptional()
    text: string;
}