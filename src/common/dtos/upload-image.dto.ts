import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class UploadImageDto {
    @IsNotEmpty()
    filename: string;

    @IsNotEmpty()
    url: string;

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(5)
    extension: string;
  }
  