import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateBookingsGuestDto } from "./dto/create-bookings-guest.dto";
import { UpdateBookingsGuestDto } from "./dto/update-bookings-guest.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { BookingsGuest } from "./entities/bookings-guest.entity";
import { Repository } from "typeorm";
import { BookingsService } from "../bookings/bookings.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class BookingsGuestsService {
  constructor(
    @InjectRepository(BookingsGuest)
    private readonly bookGRepo: Repository<BookingsGuest>,
    private readonly bookSer: BookingsService,
    private readonly userSer: UsersService
  ) {}

  async create(dto: CreateBookingsGuestDto) {
    const book = await this.bookGRepo.find({where: {bookingId: dto.bookingId}})
    const booking = await this.bookSer.findOne(dto.bookingId);
    if(book.length >= booking.guestsCount){
      throw new BadRequestException("Hona tolib boldi")
    }
    if(booking.userId == dto.userId ){
      dto.isPrmary = true
    }else{
      dto.isPrmary = false
    }
    await this.userSer.findOne(dto.userId);
    const bookigG = await this.bookGRepo.save(dto);
    return bookigG;
  }

  async findAll() {
    const findAll = await this.bookGRepo.find({
      relations: ["user", "booking"],
    });
    if (findAll.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return findAll;
  }

  async findOne(id: number) {
    const findOne = await this.bookGRepo.findOne({
      where: { id },
      relations: ["user", "booking"],
    });
    if (!findOne) {
      throw new NotFoundException("Bunday bokingGuests id yoq");
    }
    return findOne;
  }

  async update(id: number, dto: UpdateBookingsGuestDto) {
    const bookG = await this.findOne(id);
    if (bookG.userId != dto.userId) {
      await this.userSer.findOne(dto.userId!);
    }
    if (bookG.bookingId != dto.bookingId) {
      await this.bookSer.findOne(dto.bookingId!);
    }
    await this.bookGRepo.update({id}, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.bookGRepo.delete({id})
    return id
  }
}
