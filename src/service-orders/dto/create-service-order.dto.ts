import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsOptional, Min } from "class-validator";

export class CreateServiceOrderDto {
  @ApiProperty({
    example: 1,
    description: "Xizmat ID raqami (serviceId)",
  })
  @IsInt()
  @IsNotEmpty()
  serviceId: number;

  @ApiProperty({
    example: 2,
    description: "Booking (bron) ID raqami (bookingId)",
  })
  @IsInt()
  @IsNotEmpty()
  bookingId: number;

  @ApiProperty({
    example: 3,
    description: "Buyurtma miqdori (quantity)",
    default: 1,
  })
  @IsInt()
  @Min(1)
  quantity: number;
}
