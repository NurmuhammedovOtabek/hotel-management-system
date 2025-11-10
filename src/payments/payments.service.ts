import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment, PaymentStatus } from './entities/payment.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { BookingsService } from '../bookings/bookings.service';
import { Booking, BStatus } from '../bookings/entities/booking.entity';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment) private readonly paymentSer: Repository<Payment>,
    @InjectRepository(Booking) private readonly bookREpo: Repository<Booking>,
    private readonly userSer: UsersService,
    private readonly bookSer: BookingsService
  ) {}

  async create(dto: CreatePaymentDto) {
    const booking = await this.bookSer.findOne(dto.bookingId)
    const user = await this.userSer.findOne(dto.userId);
    if(booking.debt === 0){
      throw new BadRequestException("Siznong qarzdorligingiz yoq")
    }
    if(booking.debt != dto.amount){
      throw new BadRequestException("To'lov miqdori yetarli emas")
    }
    booking.debt = 0
    booking.totlaAmount = dto.amount
    booking.status = BStatus.confirmed
    const newP = await this.paymentSer.save({
      ...dto,
      payment_status: PaymentStatus.completed
    });
    await this.bookREpo.update({id:booking.id}, booking)
    return newP
  }

  async findAll() {
    const all = await this.paymentSer.find({relations:["user", "booking"]})
    if(all.length === 0){
      throw new NotFoundException("Malumot topilmadi")
    }
    return all
  }

  async findOne(id: number) {
    const one = await this.paymentSer.findOne({
      where: { id },
      relations: ["user", "booking"],
    });
    if(!one){
      throw new NotFoundException("Bunday peyment id yoq")
    }
    return one
  }

  // update(id: number, updatePaymentDto: UpdatePaymentDto) {
  //   return `This action updates a #${id} payment`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} payment`;
  // }
}
