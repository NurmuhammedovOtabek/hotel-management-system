import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  Min,
} from "class-validator";

export class CreateBookingDto {
  @ApiProperty({ description: "Xona ID si", example: 1 })
  @IsInt()
  @IsNotEmpty()
  roomId: number;

  @ApiProperty({ description: "Foydalanuvchi ID si", example: 3 })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    description: "Kirish sanasi (Check-in)",
    example: "2025-11-10",
  })
  @IsDateString()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty({
    description: "Chiqish sanasi (Check-out)",
    example: "2025-11-15",
  })
  @IsDateString()
  @IsNotEmpty()
  checkOut: Date;

  @ApiProperty({ description: "Mehmonlar soni", example: 2 })
  @IsInt()
  @Min(1)
  guestsCount: number;

}
