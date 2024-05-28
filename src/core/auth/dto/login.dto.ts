import { IsEmail, IsNotEmpty } from "class-validator";
import { EMensagem } from "src/shared/enums/mensagem.enum";

export class LoginDto {
    @IsEmail({}, { message: `Email ${EMensagem.Invalido}`})
    @IsNotEmpty({ message: `Email ${EMensagem.NaoPodeSerVazio}`})
    email: string;

    @IsNotEmpty({ message: `Senha ${EMensagem.NaoPodeSerVazio}`})
    senha: string;
}