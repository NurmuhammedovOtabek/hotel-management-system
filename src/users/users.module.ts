import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../mail/mail.module';
import { CountryModule } from '../country/country.module';
import { User } from './entities/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User]), MailModule, CountryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
