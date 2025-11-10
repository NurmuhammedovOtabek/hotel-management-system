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
import { StaffsService } from "./staffs.service";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { Roles } from "../common/decorators/role.decorator";
import { RolesGuard } from "../common/guards/role.guard";
import { AccessTokenGuard } from "../common/guards";
import { SelfGuard } from "../common/guards/self.guard";

@Controller("staffs")
export class StaffsController {
  constructor(private readonly staffsService: StaffsService) {}

  @Roles("supperadmin")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createStaffDto: CreateStaffDto) {
    return this.staffsService.create(createStaffDto);
  }

  @Roles("supperadmin")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Get()
  findAll() {
    return this.staffsService.findAll();
  }

  @UseGuards(SelfGuard)
  @UseGuards(AccessTokenGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.staffsService.findOne(+id);
  }

  @UseGuards(SelfGuard)
  @UseGuards(AccessTokenGuard)
  @Get(":id")
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateStaffDto: UpdateStaffDto) {
    return this.staffsService.update(+id, updateStaffDto);
  }

  @Roles("supperadmin")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.staffsService.remove(+id);
  }

  @Get("activate/:link")
  activateUser(@Param("link") link: string) {
    return this.staffsService.activateUser(link);
  }
}
