import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoomInventoryDto } from "./dto/create-room-inventory.dto";
import { UpdateRoomInventoryDto } from "./dto/update-room-inventory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { RoomInventory } from "./entities/room-inventory.entity";
import { Repository } from "typeorm";
import { RoomsService } from "../rooms/rooms.service";
import { InventoryService } from "../inventory/inventory.service";

@Injectable()
export class RoomInventoryService {
  constructor(
    @InjectRepository(RoomInventory)
    private readonly roomIRepo: Repository<RoomInventory>,
    private readonly roomSer: RoomsService,
    private readonly inventSer: InventoryService
  ) {}

  async create(dto: CreateRoomInventoryDto) {
    const item = await this.inventSer.findOne(dto.inventoryId);
    const count = item.quantity - dto.quantity;
    if (count < 0) {
      throw new BadRequestException("Bu maxsulaot kam qolgan");
    }
    await this.roomSer.findOne(dto.roomId);
    const RI = await this.roomIRepo.save(dto);
    item.quantity = count;
    await this.inventSer.update(+item.id, item);
    return RI;
  }

  async findAll() {
    const allI = await this.roomIRepo.find({
      relations: ["inventory", "room"],
    });
    if (allI.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return allI;
  }

  async findOne(id: number) {
    const oneI = await this.roomIRepo.findOne({
      where: { id },
      relations: ["inventory", "room"],
    });
    if (!oneI) {
      throw new NotFoundException("Bunday hona jihozi idsi yoq");
    }
    return oneI;
  }

  async update(id: number, dto: UpdateRoomInventoryDto) {
    const roomI = await this.findOne(id);
    if (roomI.roomId != dto.roomId) {
      await this.roomSer.findOne(dto.roomId!);
    }
    const item = await this.inventSer.findOne(dto.inventoryId!);
    let count = 0;
    if (roomI.inventoryId != item.id) {
      count = item.quantity - dto.quantity!;
      if (count < 0) {
        throw new BadRequestException("Bu maxsulaot kam qolgan");
      }
    }
    if (item.quantity != dto.quantity) {
      count = item.quantity - dto.quantity!;
      if (count < 0) {
        throw new BadRequestException("Bu maxsulaot kam qolgan");
      }
    }
    const RI = await this.roomIRepo.update({ id }, dto);
    item.quantity = count;
    await this.inventSer.update(+item.id, item);
    return this.findOne(id)
  }

  async remove(id: number) {
    const rItem = await this.findOne(id);
    const item = await this.inventSer.findOne(rItem.inventoryId)
    item.quantity = item.quantity + rItem.quantity
    await this.inventSer.update(+item.id, item);
    await this.roomIRepo.delete({id})
    return id
  }
}
