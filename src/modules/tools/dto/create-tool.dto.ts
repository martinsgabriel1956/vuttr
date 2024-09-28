import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  link: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  tags: Array<string>;
}
