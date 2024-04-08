import { IsEmail, IsNotEmpty, IsOptional, Length, MinLength, isString } from "class-validator";
import { EmailUnico } from "src/validator/emailAuthorValidator";

export class UpdateAuthorDTO {
    @IsNotEmpty({message: 'Por favor, infome o nome do autor'})
    @IsOptional()
    name: string;
    @IsEmail({},{message:'Por favor, informe um e-mail válido'})
    @EmailUnico({message: 'Já existe autor cadastrado com o e-mail informado'})
    @IsOptional()
    email: string;
    @Length(10, 500, {message: 'A biografia tem que conter entre 10 e 500 caracteres!'})
    @IsOptional()
    bio: string;
  }