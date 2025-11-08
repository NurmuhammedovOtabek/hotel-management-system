import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./entities/service.entity";
import { Repository } from "typeorm";

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service) private readonly serviceRepo: Repository<Service>
  ) {}

  async create(dto: CreateServiceDto) {
    const verfy = await this.serviceRepo.findOneBy({ name: dto.name });
    if (verfy) {
      throw new ConflictException("bunday servise mavjud");
    }
    const newS = await this.serviceRepo.save(dto);
    return newS
  }

  async findAll() {
    const allS = await this.serviceRepo.find()
    if(allS.length === 0){
      throw new NotFoundException("Malumot topilmadi")
    }
    return allS
  }

  async findByServ(name: string) {
    const service = await this.serviceRepo.findOneBy({ name });
    if (!service) {
      throw new NotFoundException("Bunday service yoq");
    }
    return service;
  }

  async findOne(id: number) {
    const oneS = await this.serviceRepo.findOneBy({id})
    if(!oneS){
      throw new NotFoundException("Bunday id yoq")
    }
    return oneS
  }

  async update(id: number, dto: UpdateServiceDto) {
    const servide = await this.findOne(id)
    if(servide.name !== dto.name){
      const verfy = await this.serviceRepo.findOneBy({ name: dto.name });
      if (verfy) {
        throw new ConflictException("bunday servise mavjud");
      }
    }
    await this.serviceRepo.update({id}, dto)
    return this.findOne(id)
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.serviceRepo.delete({id})
    return id
  }
}
