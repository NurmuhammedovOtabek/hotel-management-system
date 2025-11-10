import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, IsOptional, IsDateString } from "class-validator";

export class CreateRoomcleanDto {
  @ApiProperty({
    example: 5,
    description: "Tozalangan xona ID’si (Room jadvalidan foreign key)",
  })
  @IsInt()
  roomId: number;

  @ApiProperty({
    example: 2,
    description: "Tozalovchi xodim ID’si (Staff jadvalidan foreign key)",
  })
  @IsInt()
  staffId: number;

  @ApiProperty({
    example: "2025-11-08T14:30:00.000Z",
    description:
      "Tozalash sanasi (ISO formatda). Agar yuborilmasa, avtomatik hozirgi vaqt yoziladi.",
    required: false,
  })
  @IsOptional()
  @IsDateString()
  cleaningDate?: Date;

  @ApiProperty({
    example: "305-xona tozalandi, derazalar artildi.",
    description: "Tozalash bo‘yicha qisqa izoh",
  })
  @IsString()
  notes: string;
}
