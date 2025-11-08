import { Injectable } from '@nestjs/common';
import { CreateRoomcleanDto } from './dto/create-roomclean.dto';
import { UpdateRoomcleanDto } from './dto/update-roomclean.dto';

@Injectable()
export class RoomcleanService {
  create(createRoomcleanDto: CreateRoomcleanDto) {
    return 'This action adds a new roomclean';
  }

  findAll() {
    return `This action returns all roomclean`;
  }

  findOne(id: number) {
    return `This action returns a #${id} roomclean`;
  }

  update(id: number, updateRoomcleanDto: UpdateRoomcleanDto) {
    return `This action updates a #${id} roomclean`;
  }

  remove(id: number) {
    return `This action removes a #${id} roomclean`;
  }
}
