import { ApiProperty } from "@nestjs/swagger";
import {
    IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator";

export class CreateBookingsGuestDto {
  @ApiProperty({
    example: 1,
    description: "Foydalanuvchi ID raqami (userId)",
  })
  @IsInt()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({
    example: 2,
    description: "Booking (bron) ID raqami (bookingId)",
  })
  @IsInt()
  @IsNotEmpty()
  bookingId: number;

  @ApiProperty({
    example: true,
    description: "Foydalanuvchi agar asosiy bolsa true yokida false",
  })
  @IsBoolean()
  isPrmary?: boolean;
}
