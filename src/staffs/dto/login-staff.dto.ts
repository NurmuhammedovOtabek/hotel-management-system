import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class LoginStaff{
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
}