import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { RoomsService } from "./rooms.service";
import { CreateRoomDto } from "./dto/create-room.dto";
import { UpdateRoomDto } from "./dto/update-room.dto";
import { Roles } from "../common/decorators/role.decorator";
import { AccessTokenGuard } from "../common/guards";
import { RolesGuard } from "../common/guards/role.guard";

@Controller("rooms")
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @Get("desc/:name")
  name(@Param("name") name: string,) {
    return this.roomsService.getRoomsByAmenity(name);
  }

  @Get("best")
  bestRoom() {
    return this.roomsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.roomsService.findOne(+id);
  }
  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+id, updateRoomDto);
  }

  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.roomsService.remove(+id);
  }
}
