import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({
    example: "oshpaz",
    description: "Ishchini roli",
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
