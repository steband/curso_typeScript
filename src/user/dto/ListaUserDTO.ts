export class ListaUserDTO {
    constructor(
      readonly firstName: string,
      readonly lastName: string,
      readonly email: string,
      readonly phone: string,
      readonly cpf: string,
      readonly AddressId: string,
    ) {}

  }