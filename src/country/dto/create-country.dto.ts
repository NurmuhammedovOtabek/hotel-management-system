import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, Length } from "class-validator";

export class CreateCountryDto {
  @ApiProperty({
    example: "Uzbekistan",
    description: "Davlat nomlari",
  })
  @IsString()
  @Length(2, 50)
  name: string;
}
