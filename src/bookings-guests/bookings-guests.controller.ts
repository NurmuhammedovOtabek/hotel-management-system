import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BookingsGuestsService } from './bookings-guests.service';
import { CreateBookingsGuestDto } from './dto/create-bookings-guest.dto';
import { UpdateBookingsGuestDto } from './dto/update-bookings-guest.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AccessTokenGuard } from '../common/guards';

@Roles("supperadmin", "manager", "user")
@UseGuards(RolesGuard)
@UseGuards(AccessTokenGuard)
@Controller('bookings-guests')
export class BookingsGuestsController {
  constructor(private readonly bookingsGuestsService: BookingsGuestsService) {}

  @Post()
  create(@Body() createBookingsGuestDto: CreateBookingsGuestDto) {
    return this.bookingsGuestsService.create(createBookingsGuestDto);
  }

  @Get()
  findAll() {
    return this.bookingsGuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsGuestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingsGuestDto: UpdateBookingsGuestDto) {
    return this.bookingsGuestsService.update(+id, updateBookingsGuestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingsGuestsService.remove(+id);
  }
}
