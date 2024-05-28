import { IsEmail, IsNotEmpty, MaxLength } from "class-validator";
import { EMensagem } from "src/shared/enums/mensagem.enum";

export class CreateUsuarioDto {
    @IsNotEmpty({ message: `Nome ${EMensagem.NaoPodeSerVazio}`})
    @MaxLength(60, { message: `Nome ${EMensagem.MaisCaracteresQuePermitido}`})
    nome: string;
    
    @IsNotEmpty({ message: `email ${EMensagem.NaoPodeSerVazio}`})
    @IsEmail({}, { message: `email ${EMensagem.NaoPodeSerVazio}`})
    email: string;

    @IsNotEmpty({ message: `senha ${EMensagem.NaoPodeSerVazio}`})
    senha: string;

    @IsNotEmpty({ message: `ativo ${EMensagem.NaoPodeSerVazio}`})
    ativo: boolean;

    @IsNotEmpty({ message: `admin ${EMensagem.NaoPodeSerVazio}` })
    admin: boolean;
}
