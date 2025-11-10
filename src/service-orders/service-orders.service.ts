import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateServiceOrderDto } from "./dto/create-service-order.dto";
import { UpdateServiceOrderDto } from "./dto/update-service-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ServiceOrder } from "./entities/service-order.entity";
import { Repository } from "typeorm";
import { BookingsService } from "../bookings/bookings.service";
import { ServiceService } from "../service/service.service";
import { Booking } from "../bookings/entities/booking.entity";

@Injectable()
export class ServiceOrdersService {
  constructor(
    @InjectRepository(ServiceOrder)
    private readonly serviceORepo: Repository<ServiceOrder>,
    @InjectRepository(Booking)
    private readonly bookRepo: Repository<Booking>,
    private readonly bookSer: BookingsService,
    private readonly serSer: ServiceService
  ) {}

  async create(dto: CreateServiceOrderDto) {
    const booking = await this.bookSer.findOne(dto.bookingId);
    const service = await this.serSer.findOne(dto.serviceId);
    const serOr = await this.serviceORepo.findOne({
      where: { bookingId: dto.bookingId, serviceId: dto.serviceId },
    });
    if (serOr) {
      serOr.totalPrice = serOr.totalPrice + (dto.quantity * service.price)
      booking.debt = serOr.totalPrice
      serOr.quantity = serOr.quantity + dto.quantity
      await this.serviceORepo.update({id:serOr.id},serOr)
      await this.bookRepo.update({id: booking.id}, booking);
      return this.findOne(serOr.id)
    }
    const price = dto.quantity * service.price;
    booking.debt = price;
    const newS = await this.serviceORepo.save({ ...dto, totalPrice: price });
    await this.bookRepo.update({ id: booking.id }, booking);
    return newS;
  }

  async findAll() {
    const all = await this.serviceORepo.find({
      relations: ["service", "booking"],
    });
    if (all.length === 0) {
      throw new NotFoundException("Malumot topilamdi");
    }
    return all;
  }

  async findOne(id: number) {
    const one = await this.serviceORepo.findOne({
      where: { id },
      relations: ["service", "booking"],
    });
    if (!one) {
      throw new NotFoundException("Bunday ServiceOrder id yoq");
    }
    return one;
  }

  async update(id: number, dto: UpdateServiceOrderDto) {
    const serOr = await this.findOne(id);
    const booking = await this.bookSer.findOne(dto.bookingId!);
    const service = await this.serSer.findOne(dto.serviceId!);
    let price = serOr.totalPrice;
    if(serOr.serviceId != dto.serviceId){
      price = dto.quantity! * service.price;
      booking.debt = price;
      await this.bookRepo.update({ id: booking.id }, booking);
    }
    if (dto.quantity != serOr.quantity) {
      price = dto.quantity! * service.price;
      booking.debt = price;
      await this.bookRepo.update({ id: booking.id }, booking);
    }
    await this.serviceORepo.update({ id }, { ...dto, totalPrice: price });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.serviceORepo.delete({ id });
    return id;
  }
}
