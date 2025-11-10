import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";


export const GetCurrentUserId = createParamDecorator(
    (_:undefined, context: ExecutionContext): number=>{
        const request = context.switchToHttp().getRequest()
        const user = request.user

        if(!user){
            throw new BadRequestException("Token notog'ri")
        }
        return user.id
    }
)