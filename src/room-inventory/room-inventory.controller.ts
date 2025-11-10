import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomInventoryService } from './room-inventory.service';
import { CreateRoomInventoryDto } from './dto/create-room-inventory.dto';
import { UpdateRoomInventoryDto } from './dto/update-room-inventory.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AccessTokenGuard } from '../common/guards';

@Roles("supperadmin", "manager")
@UseGuards(RolesGuard)
@UseGuards(AccessTokenGuard)
@Controller("room-inventory")
export class RoomInventoryController {
  constructor(private readonly roomInventoryService: RoomInventoryService) {}

  @Post()
  create(@Body() createRoomInventoryDto: CreateRoomInventoryDto) {
    return this.roomInventoryService.create(createRoomInventoryDto);
  }

  @Get()
  findAll() {
    return this.roomInventoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomInventoryService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRoomInventoryDto: UpdateRoomInventoryDto
  ) {
    return this.roomInventoryService.update(+id, updateRoomInventoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomInventoryService.remove(+id);
  }
}
