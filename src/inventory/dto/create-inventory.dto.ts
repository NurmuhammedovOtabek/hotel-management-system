import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateInventoryDto {
  @ApiProperty({
    example: "Sochiq",
  })
  @IsString()
  @IsNotEmpty()
  itemName: string;

  @ApiProperty({
    example: 100,
  })
  @IsPositive()
  quantity: number;
}
