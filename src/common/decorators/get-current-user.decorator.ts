import { BadRequestException, createParamDecorator, ExecutionContext } from "@nestjs/common";


export const GetCurrentUser = createParamDecorator(
    (data, context: ExecutionContext)=>{
        const request = context.switchToHttp().getRequest()
        const user = request.user 

        if(!user){
            throw new BadRequestException("Token notog'ri")
        }
        if(!data){
            return user
        }
        return user[data]
    }
)