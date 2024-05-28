import { Body, Controller, Post } from '@nestjs/common';
import { ILoginPayload } from 'src/shared/interfaces/login-payload.interface';
import { IResponse } from 'src/shared/interfaces/respose.interface';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { HttpResponse } from 'src/shared/classes/http-response';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginDto: LoginDto): Promise<IResponse<ILoginPayload>> {
        const data = await this.authService.login(loginDto);

        return new HttpResponse<ILoginPayload>(data).onSuccess('Login efetuado com sucesso!');
    }
}
