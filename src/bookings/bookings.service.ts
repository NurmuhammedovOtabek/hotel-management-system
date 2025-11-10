import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Booking, BStatus } from "./entities/booking.entity";
import { LessThan, MoreThan, Not, Repository } from "typeorm";
import { UsersService } from "../users/users.service";
import { RoomsService } from "../rooms/rooms.service";

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    private readonly userSer: UsersService,
    private readonly roomSer: RoomsService
  ) {}

  async create(dto: CreateBookingDto) {
    const room = await this.roomSer.findOne(dto.roomId);
    const user = await this.userSer.findOne(dto.userId);

    const booking = await this.bookingRepo.findOne({
      where: {
        roomId: room.id,
        status: Not(BStatus.cancelled),
        checkIn: LessThan(dto.checkOut),
        checkOut: MoreThan(dto.checkIn),
      },
    });
    if (booking) {
      throw new BadRequestException(
        "Bu xona tanlangan sanalarda allaqachon band qilingan"
      );
    }
    if (room.capacity < dto.guestsCount) {
      throw new BadRequestException("Odamlar xona hajmidan ko'p");
    }
    if (room.status != "available") {
      throw new BadRequestException("Kechirasiz bu hona hizmatdan tashqarida");
    }
    const checkInDate = new Date(dto.checkIn);
    const checkOutDate = new Date(dto.checkOut);

    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const price = room.pricePerNight * days;
    const newBooking = await this.bookingRepo.save({
      ...dto,
      debt: price,
    });
    return newBooking;
  }

  async findAll() {
    const findAll = await this.bookingRepo.find({
      relations: ["user", "room"],
    });
    if (findAll.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return findAll;
  }

  async findOne(id: number) {
    const oneB = await this.bookingRepo.findOne({
      where: { id },
      relations: ["user", "room"],
    });
    if (!oneB) {
      throw new NotFoundException("Bunday Booking id yoq");
    }
    return oneB;
  }

  async update(id: number, dto: UpdateBookingDto | Booking) {
    const booking = await this.findOne(id);
    if (booking.userId != dto.userId) {
      const user = await this.userSer.findOne(dto.userId!);
    }
    const checkInDate = new Date(dto.checkIn!);
    const checkOutDate = new Date(dto.checkOut!);

    if (
      checkInDate != new Date(booking.checkIn) &&
      checkOutDate != new Date(booking.checkOut)
    ) {
      const bookings = await this.bookingRepo.findOne({
        where: {
          roomId: dto.roomId!,
          status: Not(BStatus.cancelled),
          checkIn: LessThan(dto.checkOut!),
          checkOut: MoreThan(dto.checkIn!),
        },
      });
      if (bookings && booking.userId != bookings.userId) {
        throw new BadRequestException(
          "Bu xona tanlangan sanalarda allaqachon band qilingan"
        );
      }
    }
    const days = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    const room = await this.roomSer.findOne(dto.roomId!);
    let price = room.pricePerNight * days;
    // let price = booking.totlaAmount;
    if (booking.roomId != room.id) {
      if (room.capacity < dto.guestsCount!) {
        throw new BadRequestException("Odamlar xona hajmidan ko'p");
      }
      if (room.status != "available") {
        throw new BadRequestException(
          "Kechirasiz bu hona hizmatdan tashqarida"
        );
      }

      const days = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      price = room.pricePerNight * days;
    }
    const newB = await this.bookingRepo.update({ id }, { ...dto, debt: price });

    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.bookingRepo.delete({ id });
    return id;
  }

  async freeTime(id: number) {
    await this.roomSer.findOne(id);
    const free = await this.bookingRepo.find({
      where: { roomId: id },
      select: ["roomId", "checkIn", "checkOut"],
    });
    if (!free) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return free;
  }

  async bestUser() {
    const topGuests = await this.bookingRepo
      .createQueryBuilder("booking")
      .leftJoin("booking.user", "user")
      .select("user.id", "userId")
      .addSelect("user.fullName", "name")
      .addSelect("COUNT(booking.id)", "visitCount")
      .addSelect("SUM(booking.totlaAmount)", "totalSpent")
      .groupBy("user.id")
      .orderBy('"totalSpent"', "DESC")
      .limit(10)
      .getRawMany();


    return topGuests
  }
}
