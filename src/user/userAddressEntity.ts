import { AddressEntity } from "src/address/addressEntity";

export class UserAddressEntity {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    cpf: string;
    address: AddressEntity;
  }