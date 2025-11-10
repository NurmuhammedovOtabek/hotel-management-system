import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from "class-validator";

export class CreateRoomInventoryDto {
  @ApiProperty({ description: "Xona ID si", example: 1 })
  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({ description: "Inventar ID si", example: 10 })
  @IsInt()
  @IsNotEmpty()
  inventoryId: number;

  @ApiProperty({ description: "Miqdori", example: 5 })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: "Qo'shimcha izoh",
    example: "Yangi inventar qo'shildi",
    required: false,
  })
  @IsString()
  @IsOptional()
  notes: string;
}
