import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Review } from "./entities/review.entity";
import { Repository } from "typeorm";
import { BookingsService } from "../bookings/bookings.service";
import { UsersService } from "../users/users.service";

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private readonly revRepo: Repository<Review>,
    private readonly bookSer: BookingsService,
    private readonly userSer: UsersService
  ) {}

  async create(dto: CreateReviewDto) {
    const user = await this.userSer.findOne(dto.userId);
    const booking = await this.bookSer.findOne(dto.bookingId);
    if (booking.userId !== dto.userId) {
      throw new BadRequestException("Bu booking foydalanuvchiga tegishli emas");
    }
    const newR = await this.revRepo.save(dto);
    return newR;
  }

  async findAll() {
    const all = await this.revRepo.find({ relations: ["user", "booking"] });
    if (all.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return all;
  }

  async findOne(id: number) {
    const one = await this.revRepo.findOne({
      where: { id },
      relations: ["user", "booking"],
    });
    if (!one) {
      throw new NotFoundException("Bunday review id yoq");
    }
    return one;
  }

  async update(id: number, dto: UpdateReviewDto) {
    const reviews = await this.findOne(id);
    if (reviews.userId != dto.userId) {
      const user = await this.userSer.findOne(dto.userId!);
    }
    if (reviews.bookingId != dto.bookingId) {
      const booking = await this.bookSer.findOne(dto.bookingId!);
      if (booking.userId !== dto.userId) {
        throw new BadRequestException(
          "Bu booking foydalanuvchiga tegishli emas"
        );
      }
    }
    await this.revRepo.update({id}, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.revRepo.delete({id})
    return id
  }
}
