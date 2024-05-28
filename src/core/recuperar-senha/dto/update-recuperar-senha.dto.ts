import { PartialType } from '@nestjs/mapped-types';
import { CreateRecuperarSenhaDto } from './create-recuperar-senha.dto';

export class UpdateRecuperarSenhaDto extends PartialType(CreateRecuperarSenhaDto) {}
