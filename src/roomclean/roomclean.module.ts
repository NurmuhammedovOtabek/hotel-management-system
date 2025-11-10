import { Module } from '@nestjs/common';
import { RoomcleanService } from './roomclean.service';
import { RoomcleanController } from './roomclean.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roomclean } from './entities/roomclean.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { StaffsModule } from '../staffs/staffs.module';

@Module({
  imports:[TypeOrmModule.forFeature([Roomclean]), RoomsModule, StaffsModule],
  controllers: [RoomcleanController],
  providers: [RoomcleanService],
})
export class RoomcleanModule {}
