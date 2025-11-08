import { Module } from '@nestjs/common';
import { StaffsService } from './staffs.service';
import { StaffsController } from './staffs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { MailModule } from '../mail/mail.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports:[TypeOrmModule.forFeature([Staff]), MailModule, RolesModule],
  controllers: [StaffsController],
  providers: [StaffsService],
})
export class StaffsModule {}
