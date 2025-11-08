import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
} from "class-validator";

export class CreateServiceDto {
  @ApiProperty({ example: "Laundry", description: "Xizmat nomi" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Kiyimlarni yuvish xizmati",
    description: "Xizmat tavsifi",
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 50, description: "Xizmat narxi (somda)" })
  @IsNumber()
  @Min(0)
  price: number;
}
