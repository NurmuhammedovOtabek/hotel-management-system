import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { CountryModule } from '../country/country.module';
import { User } from './entities/user.entity';
import { Booking } from '../bookings/entities/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Booking]), MailModule, CountryModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
