import { ApiProperty } from "@nestjs/swagger";
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi IDsi",
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: 5,
    description: "Booking ID (qaysi bron uchun review yozilmoqda)",
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  bookingId: number;

  @ApiProperty({
    example: 4,
    description: "Baholash (1 dan 5 gacha)",
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty({
    example: "Xona juda toza va qulay edi.",
    description: "Foydalanuvchi izohi",
    required: false,
  })
  @IsString()
  @IsOptional()
  comment?: string;
}
