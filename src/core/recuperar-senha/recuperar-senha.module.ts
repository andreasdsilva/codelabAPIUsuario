import { Module } from '@nestjs/common';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { RecuperarSenhaController } from './recuperar-senha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [RecuperarSenhaController],
  providers: [RecuperarSenhaService],
})
export class RecuperarSenhaModule {}
