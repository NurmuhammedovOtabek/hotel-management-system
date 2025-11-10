import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from "@nestjs/common";
import { CreateStaffDto } from "./dto/create-staff.dto";
import { UpdateStaffDto } from "./dto/update-staff.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Staff } from "./entities/staff.entity";
import { Repository } from "typeorm";
import bcrypt from "bcrypt";
import { MailService } from "../mail/mail.service";
import { RolesService } from "../roles/roles.service";
const { v4: uuidv4 } = require("uuid");

@Injectable()
export class StaffsService {
  constructor(
    @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
    private readonly mailService: MailService,
    private readonly roleService: RolesService
  ) {}

  async create(dto: CreateStaffDto) {
    const verifyE = await this.staffRepo.findOneBy({ email: dto.email });
    const role = await this.roleService.findOne(dto.roleId);
    if (verifyE) {
      throw new ConflictException("Bunday email mavjud");
    }
    const verifyP = await this.staffRepo.findOneBy({ phone: dto.phone });
    if (verifyP) {
      throw new ConflictException("Bunday telefon mavjud");
    }
    dto.password = await bcrypt.hash(dto.password, 7);

    const newS = await this.staffRepo.save({
      ...dto,
      activation_link: uuidv4(),
      roles: [role],
    });

    try {
      await this.mailService.sendMail(newS, "staffs");
    } catch (error) {
      throw new ServiceUnavailableException("Emailga hat yuboshirda xatolik");
    }

    return { message: "Emailga hat yuborildi", data: newS };
  }

  async findAll() {
    const allS = await this.staffRepo.find({ relations: ["roles"] });
    if (allS.length === 0) {
      throw new NotFoundException("Malumot topilamdi");
    }
    return allS;
  }

  async findEmail(email: string) {
    const emailS = await this.staffRepo.findOne({where:{email}, relations:["roles"] });
    if (!emailS) {
      throw new NotFoundException("Bunday email yoq");
    }
    return emailS;
  }

  async findOne(id: number) {
    const oneS = await this.staffRepo.findOne({
      where: { id },
      relations: ["roles"],
    });
    if (!oneS) {
      throw new NotFoundException("Bunday id yoq");
    }
    return oneS;
  }

  async update(id: number, dto: UpdateStaffDto) {
    const staff = await this.findOne(id);
    if (staff.email != dto.email) {
      const verifyE = await this.staffRepo.findOneBy({ email: dto.email });
      if (verifyE) {
        throw new ConflictException("Bunday email mavjud");
      }
    }
    if (staff.phone != dto.phone) {
      const verifyP = await this.staffRepo.findOneBy({ phone: dto.phone });
      if (verifyP) {
        throw new ConflictException("Bunday telefon mavjud");
      }
    }
    const role = await this.roleService.findOne(dto.roleId!);
    const createStaff = {
      id: staff.id,
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      roles: [role],
    };
    const newS = await this.staffRepo.save(createStaff);

    return newS;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.staffRepo.delete({ id });
    return id;
  }

  async activateUser(link: string) {
    if (!link) {
      throw new BadRequestException("Activation link not found");
    }
    const updateUser = await this.staffRepo.update(
      {
        activation_link: link,
        is_active: false,
      },
      { is_active: true }
    );
    if (updateUser.affected == 0) {
      throw new BadRequestException("User already activetes");
    }
    return {
      message: "User activated successFully",
    };
  }
}
