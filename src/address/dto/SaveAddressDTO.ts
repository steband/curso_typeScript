import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsIncompleteZipcode, IsSingle, IsValidZipCode } from "src/validator/AddressValidate";

export class SaveAddressDTO {
  @IsNotEmpty({message:'O país do endereço tem que ser preenchido!'})
  country: string;
  @IsNotEmpty({message:'O estado do endereço tem que ser preenchido!'})
  state: string;
  @IsNotEmpty({message:'A cidade do endereço tem que ser preenchido!'})
  city: string;
  @IsNotEmpty({message:'O bairro do endereço tem que ser preenchido!'})
  neighborhood: string;
  @IsNotEmpty({message:'A rua do endereço tem que ser preenchido!'})
  street: string;
  @IsNumber({},{message:'O numero do endereço tem que ser preenchido com um numero!'})
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], false)
  number: number;
  @IsString({message:'complemento'})
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], false)
  complement: string;
  @IsSingle({message: 'Os dados de endereço (CEP, número, complemento) já existem!'},['zipcode', 'number', 'complement'])
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], true)
  @IsValidZipCode({message: 'O CEP é invalido!'})
  @IsNotEmpty({message:'O CEP do endereço tem que ser preenchido!'})
  zipcode: string;
  };