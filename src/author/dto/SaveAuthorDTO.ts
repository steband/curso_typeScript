import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { EmailUnico } from "src/validator/emailAuthorValidator";

export class SaveAuthorDTO {
  @IsNotEmpty({message: 'Por favor, infome o nome do autor'})
  name: string;
  @IsEmail({},{message:'Por favor, informe um e-mail válido'})
  @EmailUnico({message: 'Já existe autor cadastrado com o e-mail informado'})
  email: string;
  @Length(10, 500, {message: 'A biografia tem que conter entre 10 e 500 caracteres!'})
  bio: string;
  };