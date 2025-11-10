import { BadRequestException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { StaffsService } from '../staffs/staffs.service';
import { JwtService } from "@nestjs/jwt";
import { User } from '../users/entities/user.entity';
import { Staff } from '../staffs/entities/staff.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUser } from '../users/dto/login-user.dto';
import bcrypt from "bcrypt";
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from "express";
import { LoginStaff } from '../staffs/dto/login-staff.dto';
import { UpdatePass } from '../users/dto/updatePass-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Staff) private readonly staffRepo: Repository<Staff>,
    private readonly jwtService: JwtService,
    private readonly staffSer: StaffsService,
    private readonly usersService: UsersService
  ) {}
  private async genereteTokens(user: User | Staff) {
    let roles: string[] = [];

    if ("role" in user && user.role) {
      roles = [user.role];
    } else if ("roles" in user && Array.isArray((user as any).roles)) {
      const maybeRoles = (user as any).roles;
      console.log(maybeRoles, "m");

      const resolved =
        typeof maybeRoles.then === "function" ? await maybeRoles : maybeRoles;
      console.log(resolved);
      roles = resolved.map((r: any) => r.name);
    }
    console.log("o", roles);

    const paylod = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: roles,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.sign(paylod, {
        secret: process.env.ACCESS_TOKEN_KEY as any,
        expiresIn: process.env.ACCESS_TOKEN_TIME as any,
      }),
      this.jwtService.sign(paylod, {
        secret: process.env.REFRESH_TOKEN_KEY as any,
        expiresIn: process.env.REFRESH_TOKEN_TIME as any,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  async register(createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  async loginUser(logDtor: LoginUser, res: Response) {
    const user = await this.usersService.findEmail(logDtor.email);
    const confirP = await bcrypt.compare(logDtor.password, user.password);
    if (!confirP) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }
    const { accessToken, refreshToken } = await this.genereteTokens(user);
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    user.token = hashedRefreshToken;
    const update = this.userRepo.update({ id: user.id }, user);

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { message: "User signed in", userId: user.id, accessToken };
  }

  async refreshTokenUser(userId: number, refresh_token: string, res: Response) {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.password) {
      throw new ForbiddenException("Access Denied");
    }
    const rtMatches = await bcrypt.compare(refresh_token, user.token);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.genereteTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.token = hashedRefreshToken;
    await this.userRepo.update({ id: user.id }, user);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: "Token yangiladi",
      userId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async logoutUser(id: number, res: Response) {
    await this.userRepo.update({ id }, { token: "" });

    res.clearCookie("refreshToken");
    return {
      message: "User Loged out",
    };
  }

  async updatePassU(dto: UpdatePass, id: number) {
    const user = await this.usersService.findOne(id);
    const { newpassword, lastpasswor } = dto;
    const confirm = await bcrypt.compare(lastpasswor, user.password);
    if (!confirm) {
      throw new BadRequestException("Parol xato");
    }
    const pass = await bcrypt.hash(newpassword, 7);
    const update = await this.userRepo.update({ id }, { password: pass });
    return { message: "Parol ozgardi" };
  }

  //Staff

  async loginStaff(logDtor: LoginStaff, res: Response) {
    const user = await this.staffSer.findEmail(logDtor.email);
    const confirP = await bcrypt.compare(logDtor.password, user.password);
    if (!confirP) {
      throw new UnauthorizedException("Parol yoki email notog'ri");
    }

    const { accessToken, refreshToken } = await this.genereteTokens({
      ...user,
    });
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    user.token = hashedRefreshToken;
    const update = this.staffRepo.update(
      { id: user.id },
      { token: hashedRefreshToken }
    );

    res.cookie("refreshToken", refreshToken, {
      maxAge: Number(process.env.COOKIE_TIME),
      httpOnly: true,
    });
    return { message: "Staff signed in", userId: user.id, accessToken };
  }

  async logoutStaff(id: number, res: Response) {
    await this.staffRepo.update({ id }, { token: "" });

    res.clearCookie("refreshToken");
    return {
      message: "Staff Loged out",
    };
  }

  async refreshTokenStaff(
    userId: number,
    refresh_token: string,
    res: Response
  ) {
    const user = await this.staffSer.findOne(userId);
    if (!user || !user.password) {
      throw new ForbiddenException("Access Denied");
    }
    const rtMatches = await bcrypt.compare(refresh_token, user.token);
    if (!rtMatches) throw new ForbiddenException("Access Denied");

    const tokens = await this.genereteTokens(user);
    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 7);
    user.token = hashedRefreshToken;
    await this.staffRepo.update({ id: user.id }, user);
    res.cookie("refreshToken", tokens.refreshToken, {
      maxAge: +process.env.COOKIE_TIME!,
      httpOnly: true,
    });
    return {
      message: "Token yangiladi",
      staffId: user.id,
      accessToken: tokens.accessToken,
    };
  }

  async updatePassS(dto: UpdatePass, id: number) {
    const user = await this.staffSer.findOne(id);
    const { newpassword, lastpasswor } = dto;
    const confirm = await bcrypt.compare(lastpasswor, user.password);
    if (!confirm) {
      throw new BadRequestException("Parol xato");
    }
    const pass = await bcrypt.hash(newpassword, 7);
    const update = await this.staffRepo.update({ id }, { password: pass });
    return { message: "Parol ozgardi" };
  }
}
