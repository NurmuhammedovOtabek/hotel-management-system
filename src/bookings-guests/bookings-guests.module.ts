import { Module } from '@nestjs/common';
import { BookingsGuestsService } from './bookings-guests.service';
import { BookingsGuestsController } from './bookings-guests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingsGuest } from './entities/bookings-guest.entity';
import { BookingsModule } from '../bookings/bookings.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([BookingsGuest]), BookingsModule, UsersModule],
  controllers: [BookingsGuestsController],
  providers: [BookingsGuestsService],
})
export class BookingsGuestsModule {}
