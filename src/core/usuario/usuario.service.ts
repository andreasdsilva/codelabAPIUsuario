import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { EMensagem } from 'src/shared/enums/mensagem.enum';
import { handleFilter } from 'src/shared/helper/sql.helper';
import { IFindAllFilter } from 'src/shared/interfaces/find-all-filter.interface';
import { IFindAllOrder } from 'src/shared/interfaces/find-all-order.interface';
import { bcrypt } from 'bcrypt'

@Injectable()
export class UsuarioService {

  @InjectRepository(Usuario)
  private repository: Repository<Usuario>;

  async create(createUsuarioDto: CreateUsuarioDto) {
    const found = await this.repository.findOne({where: {email: createUsuarioDto.email}});

    if(found) {
      throw new HttpException(EMensagem.ImpossivelCadastrar, HttpStatus.NOT_ACCEPTABLE);
    }

    const usuario = new Usuario(createUsuarioDto);
    usuario.senha = bcrypt.hashSync(usuario.senha);

    const created = this.repository.create(createUsuarioDto);

    await this.repository.save(created);

    return created;
  }

  async findAll(page: number, size: number, order: IFindAllOrder, 
    filter?: IFindAllFilter | IFindAllFilter[],): Promise<Usuario[]> {
    page--;

    const where = handleFilter(filter);

    return await this.repository.find({
      loadEagerRelations: false,
      skip: size * page,
      take: size,
    });
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.repository.findOne({where: {id: id}});
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    if(id !== updateUsuarioDto.id) {
      throw new HttpException(EMensagem.IDsDiferentes, HttpStatus.NOT_ACCEPTABLE);
    }

    const found = await this.repository.findOne({
      select: ['id'],
      where: {email : updateUsuarioDto.email}
    })

    if(found && found.id !== id) {
      throw new HttpException(EMensagem.AlteracaoImpossivel, HttpStatus.NOT_ACCEPTABLE);
    }

    updateUsuarioDto.senha = bcrypt.hashSync(updateUsuarioDto.senha);

    return await this.repository.save(updateUsuarioDto);
  }

  async unactivate(id: number): Promise<boolean> {
    const found = await this.repository.findOne({where: {id: id}});

    if(found && found.id !== id) {
      throw new HttpException(EMensagem.DesativacaoImpossivel, HttpStatus.NOT_ACCEPTABLE);
    }

    found.ativo = false;

    return (await this.repository.save(found)).ativo;
  }
}
