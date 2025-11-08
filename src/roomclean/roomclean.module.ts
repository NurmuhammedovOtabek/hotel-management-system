import { Module } from '@nestjs/common';
import { RoomcleanService } from './roomclean.service';
import { RoomcleanController } from './roomclean.controller';

@Module({
  controllers: [RoomcleanController],
  providers: [RoomcleanService],
})
export class RoomcleanModule {}
