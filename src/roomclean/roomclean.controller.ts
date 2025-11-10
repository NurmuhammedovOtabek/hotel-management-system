import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomcleanService } from './roomclean.service';
import { CreateRoomcleanDto } from './dto/create-roomclean.dto';
import { UpdateRoomcleanDto } from './dto/update-roomclean.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AccessTokenGuard } from '../common/guards';

@Roles("supperadmin", "manager", "cleaner")
@UseGuards(RolesGuard)
@UseGuards(AccessTokenGuard)
@Controller("roomclean")
export class RoomcleanController {
  constructor(private readonly roomcleanService: RoomcleanService) {}

  @Post()
  create(@Body() createRoomcleanDto: CreateRoomcleanDto) {
    return this.roomcleanService.create(createRoomcleanDto);
  }

  @Get()
  findAll() {
    return this.roomcleanService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomcleanService.findOne(+id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateRoomcleanDto: UpdateRoomcleanDto
  ) {
    return this.roomcleanService.update(+id, updateRoomcleanDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomcleanService.remove(+id);
  }
}
