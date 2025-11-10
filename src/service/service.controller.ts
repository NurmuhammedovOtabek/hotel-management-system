import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Roles } from '../common/decorators/role.decorator';
import { RolesGuard } from '../common/guards/role.guard';
import { AccessTokenGuard } from '../common/guards';

@Controller("service")
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.serviceService.create(createServiceDto);
  }

  @Get()
  findAll() {
    return this.serviceService.findAll();
  }

  @Get("name/:name")
  findOneName(@Param("name") name: string) {
    return this.serviceService.findByServ(name);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.serviceService.findOne(+id);
  }

  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateServiceDto: UpdateServiceDto) {
    return this.serviceService.update(+id, updateServiceDto);
  }

  @Roles("supperadmin", "manager")
  @UseGuards(RolesGuard)
  @UseGuards(AccessTokenGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.serviceService.remove(+id);
  }
}
