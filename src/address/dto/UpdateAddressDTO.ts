import { IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";
import { IsIncompleteZipcode, IsSingle, IsValidZipCode } from "src/validator/AddressValidate";

export class UpdateAddressDTO {
  @IsNotEmpty({message:'O país do endereço tem que ser preenchido!'})
  @IsOptional()
  country: string;
  @IsNotEmpty({message:'O estado do endereço tem que ser preenchido!'})
  @IsOptional()
  state: string;
  @IsNotEmpty({message:'A cidade do endereço tem que ser preenchido!'})
  @IsOptional()
  city: string;
  @IsNotEmpty({message:'O bairro do endereço tem que ser preenchido!'})
  @IsOptional()
  neighborhood: string;
  @IsNotEmpty({message:'A rua do endereço tem que ser preenchido!'})
  @IsOptional()
  street: string;
  @IsNumber({},{message:'O numero do endereço tem que ser preenchido com um numero!'})
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], false)
  @IsOptional()
  number: number;
  @IsString({message:'complemento'})
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], false)
  @IsOptional()
  complement: string;
  @IsSingle({message: 'Os dados de endereço (CEP, número, complemento) já existem!'},['zipcode', 'number', 'complement'])
  @IsIncompleteZipcode({message: 'Dados do endereço imcompleto O (cep, numero, complemento) deve ser preenchidos!'},['zipcode', 'number', 'complement'], true)
  @IsValidZipCode({message: 'O CEP é invalido!'})
  @IsNotEmpty({message:'O CEP do endereço tem que ser preenchido!'})
  @IsOptional()
  zipcode: string;
  }