import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CountryService {
  constructor(@InjectRepository(Country) private readonly countryRepo: Repository<Country>){}

  async create(createCountryDto: CreateCountryDto) {
    const find = await this.countryRepo.findOneBy({name: createCountryDto.name})
    if(find){
      throw new ConflictException("Bunday davlat mavjud")
    }
    const newC = await this.countryRepo.save(createCountryDto)
    return newC
  }

  async findAll() {
    const allC = await this.countryRepo.find({ relations: ["users"] });
    if(allC.length === 0){
      throw new NotFoundException("Hali malumot yoq")
    }
    return allC
  }

  async findOne(id: number) {
    const oneC = await this.countryRepo.findOneBy({id})
    if(!oneC){
      throw new NotFoundException("Bunday id lik country yoq")
    }
    return oneC
  }

  async update(id: number, dto: UpdateCountryDto) {
    const country = await this.findOne(id)
    const verfy = await this.countryRepo.findOneBy({name: dto.name})
    if (verfy) {
      throw new ConflictException("Bunday davlat mavjud");
    }
    const newC = await this.countryRepo.update({id}, dto)
    if (newC.affected! == 0) {
      throw new NotFoundException("malumot yangilashda xatolik");
    }
    return this.findOne(id)
  }

  async remove(id: number) {
    const del = await this.countryRepo.delete({ id });
    if (del.affected! == 0) {
      throw new NotFoundException("Bunday id yoq");
    }
    return id;
  }
}
