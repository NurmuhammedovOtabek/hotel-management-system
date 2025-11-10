import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Staff } from '../staffs/entities/staff.entity';
import { UsersModule } from '../users/users.module';
import { StaffsModule } from '../staffs/staffs.module';
import { AccessTokenStrategy, RefreshTokenCookiesStrategy } from '../common/strategies';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[TypeOrmModule.forFeature([User, Staff]),JwtModule.register({ global: true }), UsersModule, StaffsModule],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, RefreshTokenCookiesStrategy],
})
export class AuthModule {}
