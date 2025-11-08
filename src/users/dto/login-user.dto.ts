import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginUser{
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
}