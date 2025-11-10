import { ApiProperty } from "@nestjs/swagger";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from "class-validator";
import { PaymentMethod, PaymentStatus } from "../entities/payment.entity";

export class CreatePaymentDto {
  @ApiProperty({
    example: 1,
    description: "Tolov qilgan foydalanuvchi ID raqami (userId)",
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  userId: number;

  @ApiProperty({
    example: 3,
    description: "Tolov qilingan booking (bron) ID raqami (bookingId)",
  })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  bookingId: number;

  @ApiProperty({
    example: 550000,
    description: "Tolov summasi (amount)",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: PaymentMethod.card,
    description: "Tolov turi (payment_method)",
    enum: PaymentMethod,
    default: PaymentMethod.cash,
  })
  @IsEnum(PaymentMethod)
  @IsOptional()
  payment_method?: PaymentMethod;
}
