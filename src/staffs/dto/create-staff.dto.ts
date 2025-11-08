import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  Length,
  Matches,
} from "class-validator";

export class CreateStaffDto {
  @ApiProperty({
    example: "Ishchi1",
    description: "Ishchining ismi",
  })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({
    example: "ishchi@gmail.com",
    description: "Ishchini emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "1234567",
  })
  @IsString()
  @Length(6, 12)
  password: string;

  @ApiProperty({
    example: "+998456321789",
  })
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phone: string;

  @ApiProperty({
    example:1
  })
  @IsInt()
  @IsPositive()
  roleId:number
}
