import { Injectable } from '@nestjs/common';
import { CreateRecuperarSenhaDto } from './dto/create-recuperar-senha.dto';
import { UpdateRecuperarSenhaDto } from './dto/update-recuperar-senha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RecuperarSenha } from './entities/recuperar-senha.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class RecuperarSenhaService {
  @InjectRepository(RecuperarSenha)
  private repository: Repository<RecuperarSenha>;
  @InjectRepository(Usuario)
  private usuarioRepository: Repository<Usuario>;

  async create(createRecuperarSenhaDto: CreateRecuperarSenhaDto) {
    const found = await this.usuarioRepository.findOne({
      select: ['id'],
      where: {email : createRecuperarSenhaDto.email}
    });

    if(found) {
      const created = this.repository.create(createRecuperarSenhaDto);
      this.repository.save(created);
    }
  }
}
