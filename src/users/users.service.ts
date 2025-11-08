import { BadRequestException, ConflictException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import bcrypt from "bcrypt"
import { MailService } from '../mail/mail.service';
import { CountryService } from '../country/country.service';
const { v4: uuidv4 } = require("uuid");


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly mailService: MailService,
    private readonly countryService: CountryService
  ) {}

  async create(dto: CreateUserDto) {
    const verfy = await this.userRepo.findOneBy({ email: dto.email });
    if (verfy) {
      throw new ConflictException("bunday email egasi mavjud");
    }
    const verfy2 = await this.userRepo.findOneBy({ phone: dto.phone });
    if (verfy2) {
      throw new ConflictException("bunday raqam egasi mavjud");
    }
    const verfy3 = await this.userRepo.findOneBy({ passport: dto.passport });
    if (verfy3) {
      throw new ConflictException("bunday raqam egasi mavjud");
    }
    await this.countryService.findOne(dto.countryId)

    dto.password = await bcrypt.hash(dto.password, 7); 
    const newU = await this.userRepo.save({
      ...dto,
      activation_link: uuidv4(),
    });

    try {
      await this.mailService.sendMail(newU, "users");
    } catch (error) {
      throw new ServiceUnavailableException("Emailga hat yuboshirda xatolik");
    }

    return { message: "Emailga hat yuborildi", data: newU };
  }

  async findAll() {
    const allU = await this.userRepo.find();
    if (allU.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return allU;
  }

  async findOne(id: number) {
    const oneU = await this.userRepo.findOneBy({ id });
    if (!oneU) {
      throw new NotFoundException("Bunday id yoq");
    }
    return oneU;
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    
    if (user.email != dto.email) {
      const verfy = await this.userRepo.findOneBy({ email: dto.email });
      if (verfy) {
        throw new ConflictException("bunday email egasi mavjud");
      }
    }
    if (user.phone != dto.phone) {
      const verfy2 = await this.userRepo.findOneBy({ phone: dto.phone });
      if (verfy2) {
        throw new ConflictException("bunday raqam egasi mavjud");
      }
    }
    if(user.countryId != dto.countryId){
      await this.countryService.findOne(dto.countryId!)
    }
    const updateU = await this.userRepo.update(
      { id },
      {
        email: dto.email,
        phone: dto.phone,
        fullName: dto.fullName,
        age: dto.age,
        gender: dto.gender,
        countryId: dto.countryId
      }
    );
    return this.findOne(id);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await this.userRepo.delete({ id });
    return id;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateUser = await this.userRepo.update(
      {      
        activation_link: link,
        is_active: false,
      },
      { is_active: true },
        
      
    );
    if (updateUser.affected == 0) {
      throw new BadRequestException("User already activetes");
    }
    return {
      message: "User activated successFully"
    };
  }
}
