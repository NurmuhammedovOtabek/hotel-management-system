import { PartialType } from '@nestjs/swagger';
import { CreateRoomcleanDto } from './create-roomclean.dto';

export class UpdateRoomcleanDto extends PartialType(CreateRoomcleanDto) {}
