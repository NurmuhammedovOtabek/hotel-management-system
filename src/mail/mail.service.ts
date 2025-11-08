import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import { User } from "../users/entities/user.entity";
import { Staff } from "../staffs/entities/staff.entity";

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(user: User| Staff , yol: string) {
    const url = `${process.env.API_HOST}/api/${yol}/activate/${user.activation_link}`;
    console.log(url);

    await this.mailerService.sendMail({
      to: user.email,
      subject: "Welecom",
      template: "./confirmation",
      context: {
        name: user.fullName,
        url,
      },
    });
  }

}
