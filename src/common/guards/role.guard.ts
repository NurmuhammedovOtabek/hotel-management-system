import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "../decorators/role.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Controller yoki handler ustidagi kerakli rollarni olish
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );

    if (!requiredRoles) return true; // Agar controllerda role belgilanmagan bo‘lsa, hamma kira oladi

    const { user } = context.switchToHttp().getRequest();

    if (!user) throw new ForbiddenException("Token notogri yoki mavjud emas");

    // Foydalanuvchi rollarini tekshirish
    const hasRole = user.role.some((r: string) => requiredRoles.includes(r));

    if (!hasRole) throw new ForbiddenException("Sizga ruxsat yoq");

    return true;
  }
}
