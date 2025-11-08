import { BadCount, RType, Status } from "../entities/room.entity";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateRoomDto {
  @ApiProperty({ example: 101, description: "Xonaning raqami (unikal)" })
  @IsInt()
  @IsPositive()
  roomNumber: number;

  @ApiProperty({ example: 2, description: "Qavat raqami" })
  @IsInt()
  @Min(1)
  floor: number;

  @ApiProperty({
    enum: RType,
    example: RType.suite,
    description: "Xona turi (single, double, suite, family)",
  })
  @IsEnum(RType)
  type: RType;

  @ApiProperty({
    enum: BadCount,
    example: BadCount.twin,
    description: "Xonadagi karavotlar soni",
  })
  @IsEnum(BadCount)
  badCount: BadCount;

  @ApiProperty({ example: 3, description: "Xonaga sig‘adigan mehmonlar soni" })
  @IsInt()
  @Min(1)
  @Max(10)
  capacity: number;

  @ApiProperty({ example: 450000, description: "Tunlik narxi (so‘mda)" })
  @IsNumber()
  @IsPositive()
  pricePerNight: number;

  @ApiProperty({
    enum: Status,
    example: Status.available,
    description:
      "Xonaning hozirgi holati (available, booked, cleaning, maintenance)",
  })
  @IsEnum(Status)
  status: Status;

  @ApiProperty({
    example: "Balkonli xona, tog‘ manzarasi bilan",
    description: "Xonaga oid tavsif",
  })
  @IsString()
  @Length(10, 200)
  description: string;

  @ApiProperty({
    example: "Wi-Fi, TV, Mini-bar, Air conditioner",
    description: "Xonada mavjud qulayliklar (vergul bilan ajratilgan)",
  })
  @IsString()
  @IsNotEmpty()
  amenities: string;
}
