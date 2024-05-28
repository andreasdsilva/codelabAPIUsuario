import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';
import { LoginDto } from './dto/login.dto';
import { ILoginPayload } from 'src/shared/interfaces/login-payload.interface';
import { bcrypt } from 'bcrypt'

@Injectable()
export class AuthService {

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>;

    async login(loginDto: LoginDto): Promise<ILoginPayload> {
        const found = await this.usuarioRepository.findOne({select: ['id', 'senha', 'email', 'admin', 'nome'], 
            where: {email: loginDto.email, senha: loginDto.senha}
        });

        const matchPassword = bcrypt.compareSync(loginDto.senha, found.senha)

        if(!found) {
            throw new HttpException('Usuário e/ou senha inválido', HttpStatus.UNAUTHORIZED)
        }

        delete found.senha;

        return Object.assign({}, found) as ILoginPayload;
    }
}
