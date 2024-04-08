import { IsEmail, IsNotEmpty } from "class-validator";
import { IsSingleUser, IsValidPhone, IsValidcpf } from "src/validator/UserValidator";

export class SaveUserDTO {
  @IsNotEmpty({message: 'O primeiro nome tem que ser preenchido!'})
  firstName: string;
  @IsNotEmpty({message: 'O ultimo nome tem que ser preenchido!'})
  lastName: string;
  @IsEmail({},{message: 'Email invalido!'})
  @IsSingleUser({message: 'Email já cadastrado para outro usuário'}, 'email')
  email: string;
  @IsValidPhone({message: 'Telefone invalido. Favor utilizar o seguinte formato"(21) 0000-0000"!'})
  @IsSingleUser({message: 'Telefone ja cadastrado para outro usuário'}, 'phone')
  phone: string;
  @IsValidcpf({message:'CPF invalido'})
  @IsSingleUser({message: 'CPF ja cadastrado para outro usuário'}, 'cpf')
  cpf: string;
  AddressId: string;
  };