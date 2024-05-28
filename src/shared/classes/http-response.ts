import { EMensagem } from '../enums/mensagem.enum';
import { IResponse } from '../interfaces/respose.interface';

export class HttpResponse<T> implements IResponse<T> {
  message = '';
  data: T | null | undefined;

  constructor(data: T | null | undefined, message?: '') {
    this.message = message;
    this.data = data;
  }

  onCreated(): IResponse<T> {
    this.message = EMensagem.SalvoSucesso;
    return this;
  }

  onUpdate(): IResponse<T> {
    this.message = EMensagem.AtualizadoSucesso;
    return this;
  }

  onUnactivated(): IResponse<T> {
    this.message = EMensagem.DesativadoSucesso;
    return this;
  }

  onSuccess(message: string): IResponse<T> {
    this.message = message;
    return this;
  }
}