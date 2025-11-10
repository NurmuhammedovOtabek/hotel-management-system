import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AccessTokenGuard } from '../common/guards';

@Roles("supperadmin", "manager", "user")
@UseGuards(RolesGuard)
@UseGuards(AccessTokenGuard)
@Controller("bookings")
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingsService.create(createBookingDto);
  }

  @Get()
  findAll() {
    return this.bookingsService.findAll();
  }

  @Get("user")
  bestUser() {
    return this.bookingsService.bestUser();
  }

  @Get("free/:id")
  findFree(@Param("id") id: string) {
    return this.bookingsService.freeTime(+id);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.bookingsService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingsService.update(+id, updateBookingDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.bookingsService.remove(+id);
  }
}
