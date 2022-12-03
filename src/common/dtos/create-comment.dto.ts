import { IsNotEmpty, IsEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  text: string;

  @IsEmpty()
  status?: string;
}
