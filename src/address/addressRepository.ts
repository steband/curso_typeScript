import { Injectable } from "@nestjs/common";
import { AddressEntity } from "./addressEntity";
import { UpdateAddressDTO } from "./dto/UpdateAddressDTO";
import slugify from "slugify";

@Injectable()
export class AddressRepository{
    private Address:AddressEntity[] = [];

    async save(address: AddressEntity){
        try{
            this.Address.push(address);
        } catch( e ) {
            return e.console.error();
        }
    }

    async update (id: string, address: UpdateAddressDTO){
        try{
            const addressUpdate = this.addressFindID(id);
            Object.entries(address).forEach(([chave, valor]) => {
                if (chave === 'id'){
                    return
                }
                addressUpdate[chave] = valor;
            })
            return addressUpdate;
        } catch (e) {
            return e.console.error();
        }
    }

    async delete(id: string){
        try{
            const AddressDelete = this.addressFindID(id);
            this.Address = this.Address.filter(x => x.id !== id)
            return AddressDelete;
        } catch ( e ) {
            return e.console.error();
            
        }
    }

    async find(param){
        let chave = '', valor = ''
        console.log('find repository')
        if (param){
            [chave, valor] = param;
        }
        
        let addressFind: AddressEntity[]
        try{
            switch (chave) {
            case 'id':
                addressFind = [this.addressFindID(valor)]
                break;

            case 'cep':
                addressFind = [this.addressFindID(valor)]
                break;
                
            case 'pais':
                addressFind = [this.addressFindID(valor)]
                break;
                    
            default:
                addressFind = this.Address
                break;
            }
            return addressFind
        } catch(e) {
            return e.message
        }

    }

    private addressFindID(id: string){
        const addressFind = this.Address.find(address => address.id === id)
        if (!addressFind){
            throw new Error('Endereço não existe!')
        }
        return addressFind;
    }

    async haveAddress(zipcode: string, number: number, complement: string = ''){
        console.log(`zipcode: ${zipcode} complement: ${complement}`)
        let findAddress: AddressEntity  = this.Address.find(c => c.zipcode === zipcode && c.number === number && c.complement === complement)
        return findAddress !== undefined
    }

    private convertSlug(slug: string){
        const convert = slugify(slug, {lower: true});
        return convert;
    }
}