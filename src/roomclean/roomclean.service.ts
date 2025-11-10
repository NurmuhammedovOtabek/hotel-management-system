import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoomcleanDto } from "./dto/create-roomclean.dto";
import { UpdateRoomcleanDto } from "./dto/update-roomclean.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Roomclean } from "./entities/roomclean.entity";
import { Repository } from "typeorm";
import { RoomsService } from "../rooms/rooms.service";
import { StaffsService } from "../staffs/staffs.service";

@Injectable()
export class RoomcleanService {
  constructor(
    @InjectRepository(Roomclean)
    private readonly roomCrepo: Repository<Roomclean>,
    private readonly roomService: RoomsService,
    private readonly staffService: StaffsService
  ) {}

  async create(dto: CreateRoomcleanDto) {
    await this.roomService.findOne(dto.roomId);
    const staff = await this.staffService.findOne(dto.staffId);
    if(staff.roles[0].name != "cleaner"){
      throw new BadRequestException("Faqat tozalovchi kritaoladi")
    }
    const newRC = await this.roomCrepo.save(dto);
    return newRC;
  }

  async findAll() {
    const allR = await this.roomCrepo.find({ relations: ["staff", "room"] });
    if (allR.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return allR;
  }

  async findOne(id: number) {
    const oneR = await this.roomCrepo.findOne({
      where: { id },
      relations: ["staff", "room"],
    });
    if (!oneR) {
      throw new NotFoundException("Bunday xona tozalash id yoq");
    }
    return oneR;
  }

  async update(id: number, dto: UpdateRoomcleanDto) {
    const rClear = await this.findOne(id);
    if (rClear.roomId != dto.roomId) {
      await this.roomService.findOne(dto.roomId!);
    }
    if (rClear.staffId != dto.staffId) {
      await this.staffService.findOne(dto.staffId!);
    }
    const updateRC = await this.roomCrepo.update({ id }, dto);
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.roomCrepo.delete({ id });
    return id;
  }
}
