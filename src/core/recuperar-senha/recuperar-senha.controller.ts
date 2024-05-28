import { Controller, Post, Body } from '@nestjs/common';
import { RecuperarSenhaService } from './recuperar-senha.service';
import { CreateRecuperarSenhaDto } from './dto/create-recuperar-senha.dto';
import { IResponse } from 'src/shared/interfaces/respose.interface';
import { HttpResponse } from 'src/shared/classes/http-response';

@Controller('recuperar-senha')
export class RecuperarSenhaController {
  constructor(private readonly recuperarSenhaService: RecuperarSenhaService) {}

  @Post()
  async create(@Body() createRecuperarSenhaDto: CreateRecuperarSenhaDto) : Promise<IResponse<boolean>> {
    await this.recuperarSenhaService.create(createRecuperarSenhaDto);
    return new HttpResponse<boolean>(true).onSuccess('Autenticado com sucesso!');
  }
}
