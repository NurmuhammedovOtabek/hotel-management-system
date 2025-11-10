import { PartialType } from '@nestjs/swagger';
import { CreateBookingsGuestDto } from './create-bookings-guest.dto';

export class UpdateBookingsGuestDto extends PartialType(CreateBookingsGuestDto) {}
