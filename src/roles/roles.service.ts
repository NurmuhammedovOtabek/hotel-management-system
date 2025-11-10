import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateRoleDto } from "./dto/create-role.dto";
import { UpdateRoleDto } from "./dto/update-role.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "./entities/role.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role) private readonly roleRepo: Repository<Role>
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const verify = await this.roleRepo.findOneBy({ name: createRoleDto.name });
    if (verify) {
      throw new ConflictException("Bunday role mavjud");
    }
    createRoleDto.name = createRoleDto.name?.toLowerCase();

    const role = await this.roleRepo.save(createRoleDto);
    return role;
  }

  async findAll() {
    const allR = await this.roleRepo.find();
    if (allR.length === 0) {
      throw new NotFoundException("Malumot topilmadi");
    }
    return allR;
  }

  async findRole(name: string) {
    const oneR = await this.roleRepo.findOneBy({ name });
    if (!oneR) {
      throw new NotFoundException("Bunday role yoq");
    }
    return oneR;
  }

  async findOne(id: number) {
    const oneR = await this.roleRepo.findOneBy({ id });
    if (!oneR) {
      throw new NotFoundException("Bunday id yoq");
    }
    return oneR;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOne(id);
    if (role.name != updateRoleDto.name) {
      const verify = await this.roleRepo.findOneBy({
        name: updateRoleDto.name,
      });
      if (verify) {
        throw new ConflictException("Bunday role mavjud");
      }
    }
    updateRoleDto.name = updateRoleDto.name?.toLowerCase();
    await this.roleRepo.update({ id }, updateRoleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const role = await this.findOne(id);
    await this.roleRepo.delete({ id });
    return id;
  }
}
