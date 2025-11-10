import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenGuard } from '../common/guards';
import { GetCurrentUserId } from '../common/decorators/get-current-user-id.decorator';
import type { Response } from "express";
import { GetCurrentUser } from '../common/decorators/get-current-user.decorator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUser } from '../users/dto/login-user.dto';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post("loginU")
  loginUser(
    @Body() loginUserDto: LoginUser,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginUser(loginUserDto, res);
  }
  // @UseGuards()
  // @Post("newPassU")
  // newPassu(){

  // }

  @UseGuards(RefreshTokenGuard)
  @Post(":id/refreshU")
  @HttpCode(HttpStatus.OK)
  refreshUser(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenUser(+userId, refreshToken, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("logoutU")
  @HttpCode(HttpStatus.OK)
  logoutUser(
    @GetCurrentUserId() usertId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutUser(+usertId, res);
  }

  //Staff

  @Post("loginS")
  loginStaff(
    @Body() loginUserDto: LoginUser,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.loginStaff(loginUserDto, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post(":id/refreshU")
  @HttpCode(HttpStatus.OK)
  refreshStaff(
    @GetCurrentUserId() userId: number,
    @GetCurrentUser("refreshToken") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.refreshTokenStaff(+userId, refreshToken, res);
  }

  @UseGuards(RefreshTokenGuard)
  @Post("logoutU")
  @HttpCode(HttpStatus.OK)
  logoutStaff(
    @GetCurrentUserId() usertId: number,
    @Res({ passthrough: true }) res: Response
  ) {
    return this.authService.logoutStaff(+usertId, res);
  }
}
