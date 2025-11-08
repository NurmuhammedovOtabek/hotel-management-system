import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoomsService {
  constructor(@InjectRepository(Room) private readonly roomRepo: Repository<Room>){}

  async create(dto: CreateRoomDto) {
    const verify = await this.roomRepo.findOneBy({roomNumber: dto.roomNumber})
    if(verify){
      throw new ConflictException("Bunday hona mavjud")
    }
    const newR = await this.roomRepo.save(dto)
    return newR
  }

  async findAll() {
    const allR = await this.roomRepo.find()
    if(allR.length === 0){
      throw new NotFoundException("Malumot mavjud emas")
    }
    return allR
  }

  async findOne(id: number) {
    const oneR = await this.roomRepo.findOneBy({id})
    if(!oneR){
      throw new NotFoundException("Bunday id yoq")
    }
    return oneR
  }

  async update(id: number, dto: UpdateRoomDto) {
    const room = await this.findOne(id)
    if(room.roomNumber != dto.roomNumber){
      const verify = await this.roomRepo.findOneBy({
        roomNumber: dto.roomNumber,
      });
      if (verify) {
        throw new ConflictException("Bunday hona mavjud");
      }
    }
    await this.roomRepo.update({id}, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.roomRepo.delete({id})
    return id
  }
}
