
export class ListaAddressDTO {
    constructor(
      readonly country: string,
      readonly state: string,
      readonly city: string,
      readonly neighborhood: string,
      readonly street: string,
      readonly number: number,
      readonly complement: string,
      readonly zipcode: string,
    ) {}

  }