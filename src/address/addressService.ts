import { BadRequestException, Injectable } from "@nestjs/common";
import { AddressController } from "./addressController";
import { AddressEntity } from "./addressEntity";
import { AddressRepository } from "./addressRepository";
import { SaveAddressDTO } from "./dto/SaveAddressDTO";
import { v4 as uuid } from "uuid";
import { UpdateAddressDTO } from "./dto/UpdateAddressDTO";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";


@Injectable()
export class AddressService{
    constructor(private AddressRepository: AddressRepository){}

    async addressFind(parametro) {
        console.log('addressFind Service')
        return this.AddressRepository.find(parametro)
      }

    async addressSave(dadoAddress: AddressEntity){
        try {
            const saveAddress = await plainToInstance(SaveAddressDTO, dadoAddress);
            await validate(saveAddress).then(errors => {
                if (errors.length > 0) {
                    const formattedErrors = errors.map(erro => ({
                      property: erro.property,
                      constraints: erro.constraints,
                    }));
                    throw new BadRequestException({ message: "Erro de validação", errors: formattedErrors });
                }
            });
            console.log('passei palo error?')
            const address = new AddressEntity();
            address.country = dadoAddress.country;
            address.state = dadoAddress.state;
            address.city = dadoAddress.city;
            address.neighborhood = dadoAddress.neighborhood;
            address.street = dadoAddress.street;
            address.number = dadoAddress.number;
            address.complement = dadoAddress.complement;
            if(!dadoAddress.complement){
                address.complement = '';
            }
            address.zipcode = dadoAddress.zipcode;
            address.id = uuid();
            this.AddressRepository.save(address);
            return {id: address.id, país: address.country, CEP: address.zipcode, numero: address.number, complemento: address.complement, message: 'Endereço incluida com sucesso!'}
        } catch ( e ){
            return (e);
        }
    }
    async addressUpdate(id: string, dadoAddress: UpdateAddressDTO){
        const updateAddress = await this.AddressRepository.update(id, dadoAddress);
        return {Address: updateAddress, message: 'Endereço atualizada com sucesso!'}
    }
    async addressDelete(id: string){
        const deleteAddress = await this.AddressRepository.delete(id);
        return {autor: deleteAddress, message: 'Endereço Excluida com sucesso!'}
    }    
}