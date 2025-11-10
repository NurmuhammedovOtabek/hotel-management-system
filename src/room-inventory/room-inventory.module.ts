import { Module } from '@nestjs/common';
import { RoomInventoryService } from './room-inventory.service';
import { RoomInventoryController } from './room-inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomInventory } from './entities/room-inventory.entity';
import { RoomsModule } from '../rooms/rooms.module';
import { InventoryModule } from '../inventory/inventory.module';

@Module({
  imports:[TypeOrmModule.forFeature([RoomInventory]), RoomsModule, InventoryModule],
  controllers: [RoomInventoryController],
  providers: [RoomInventoryService],
})
export class RoomInventoryModule {}
