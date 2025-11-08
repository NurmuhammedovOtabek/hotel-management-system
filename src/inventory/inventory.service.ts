import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InventoryService {
  constructor(@InjectRepository(Inventory) private readonly inverRepo: Repository<Inventory>){}

  async create(dto: CreateInventoryDto) {
    const item = await this.inverRepo.findOneBy({itemName:dto.itemName})
    if(item){
      throw new ConflictException("bunday mahsulot mavjud")
    }
    const newItem = await this.inverRepo.save(dto)
    return dto
  }

  async findAll() {
    const allI = await this.inverRepo.find()
    if(allI.length === 0){
      throw new NotFoundException("Malumot topilmadi")
    }
    return allI
  }

  async findOne(id: number) {
    const oneI = await this.inverRepo.findOneBy({id})
    if(!oneI){
      throw new NotFoundException("Bunday id yoq")
    }
    return oneI
  }

  async update(id: number, dto: UpdateInventoryDto) {
    const item = await this.findOne(id)
    if(item.quantity != dto.quantity){
      const item = await this.inverRepo.findOneBy({ itemName: dto.itemName });
      if (item) {
        throw new ConflictException("bunday mahsulot mavjud");
      }
    }
    await this.inverRepo.update({id}, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.inverRepo.delete({id})
    return id
  }
}
