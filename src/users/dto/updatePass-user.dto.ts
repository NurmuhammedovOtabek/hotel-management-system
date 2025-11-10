
import { IsString, Length } from "class-validator";

export class UpdatePass {
  @IsString()
  @Length(6, 10)
  lastpasswor: string;

  @IsString()
  @Length(6, 10)
  newpassword: string;
}