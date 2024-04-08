import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { IsSingleUser, IsValidPhone, IsValidcpf } from "src/validator/UserValidator";

export class UpdateUserDTO {
  @IsNotEmpty({message: 'O primeiro nome tem que ser preenchido!'})
  @IsOptional()
  firstName: string;
  @IsNotEmpty({message: 'O ultimo nome tem que ser preenchido!'})
  @IsOptional()
  lastName: string;
  @IsEmail({},{message: 'Email invalido!'})
  @IsSingleUser({message: 'Email já cadastrado para outro usuário'}, 'email')
  @IsOptional()
  email: string;
  @IsValidPhone({message: 'Telefone invalido. Favor utilizar o seguinte formato"(21) 0000-0000"!'})
  @IsSingleUser({message: 'Telefone ja cadastrado para outro usuário'}, 'phone')
  @IsOptional()
  phone: string;
  @IsValidcpf({message:'CPF invalido'})
  @IsSingleUser({message: 'CPF ja cadastrado para outro usuário'}, 'cpf')
  @IsOptional()
  cpf: string;
  AddressId: string;
  }