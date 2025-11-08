import { IsEmail, IsInt, IsNotEmpty, IsString, Length, Matches, Max, Min } from "class-validator";
import { Gender } from "../entities/user.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    example: "mehmon mehmonov",
    description: "Mehmoni ism faliliyasi",
  })
  @IsString()
  @Length(2, 50)
  fullName: string;

  @ApiProperty({
    example: 25,
    description: "Yoshi",
  })
  @IsInt()
  @Min(1)
  @Max(110)
  age: number;

  @ApiProperty({
    example: "mehmon@gmail.com",
    description: "emaili",
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "123456",
    description: "paroli",
  })
  @IsString()
  @Length(6, 10)
  password: string;

  @ApiProperty({
    example: "+998993216547",
    description: "telefon raqami",
  })
  @IsNotEmpty()
  @Matches(/^\+?[1-9]\d{1,14}$/)
  phone: string;

  @ApiProperty({
    example:"ad1234567"
  })
  @IsString()
  @Matches(/^[A-Z]{2}\d{7}$/)
  passport: string;

  @ApiProperty({
    example: 1
  })
  @IsInt()
  countryId: number;

  @IsNotEmpty()
  gender: Gender;
}
