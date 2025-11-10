import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";

@Injectable()
export class SelfGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user; 
    const paramId = request.params.id; 

    if (!user) throw new ForbiddenException("Token noto'g'ri yoki mavjud emas");

    if (user.id == paramId || user.role.includes("supperadmin")) {
      return true;
    }

    throw new ForbiddenException("Sizga ruxsat yo'q");
  }
}
