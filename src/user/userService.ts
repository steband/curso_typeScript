import { plainToInstance } from "class-transformer";
import { UserRepository } from "./userRepository";
import { v4 as uuid } from "uuid"
import { UserAddressEntity } from "./userAddressEntity";
import { validate } from "class-validator";
import { UserEntity } from "./UserEntity";
import { SaveUserDTO } from "./dto/SaveUserDTO";
import { AddressEntity } from "src/address/addressEntity";
import { AddressService } from "src/address/addressService";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(private UserRepository: UserRepository,
        private AddressService: AddressService){}

    async userFind(parametro) {
        return this.UserRepository.find(parametro)
      }

    async Save(dadoUser: any){
        const dadosDto = plainToInstance(UserAddressEntity, dadoUser);
        const erros = await validate(dadosDto);
        if (erros.length > 0){
            return this.userSave(dadoUser);
        } else {
            return this.userAddressSave(dadoUser);
        }
    }

    async userSave(dadoUser: SaveUserDTO){
        const User = new UserEntity();

        User.firstName = dadoUser.firstName;
        User.lastName = dadoUser.lastName;
        User.email = dadoUser.email;
        User.phone = dadoUser.phone;
        User.cpf = dadoUser.cpf;
        User.AddressId = dadoUser.AddressId
        User.id = uuid();
        this.UserRepository.save(User);
        return {id: User.id, nome: `${User.firstName} ${User.lastName}`, AddressId: User.AddressId, message: 'Usuário incluido com sucesso!'}
    }

    async userAddressSave(dadoUser: UserAddressEntity){
        try {
            const address: AddressEntity = dadoUser.address
            console.log(address)
            console.log('ultima linha que passou!')
            const returnAddress = await this.AddressService.addressSave(address);//axios.post(`${this.addressServiceUrl}`, dadoUser.address);//
            console.log('não chega');
            if (returnAddress.id === undefined){
                 return (returnAddress.message)
            }
            const User = plainToInstance( UserEntity, dadoUser);
            const erros = await validate(User);
    
            User.AddressId = (await returnAddress).id;
            return this.userSave(User)
        }catch ( e ) {
            return ({Erro: e.message, Status: e.stack});
        }

    }

    async UserUpdate(id: string, dadoUser: any){
        try{
            const dadosDto = plainToInstance(UserAddressEntity, dadoUser);
            const erros = await validate(dadosDto);
            if (erros.length <= 0){
                const parametro = ['id', id]
                const User = await this.UserRepository.find(parametro);
                const Address = await this.AddressService.addressUpdate(User[0].AddressId, dadoUser.address); //axios.put(`${this.addressServiceUrl}/${User[0].AddressId}`,dadoUser.address)//
                //verificar se tem erro do address
                if(Address.Address.id === undefined){
                    return Address.message;
                }
                const dadosDto = plainToInstance(UserEntity, dadoUser);
                const updateUser = await this.UserRepository.update(id, dadosDto);
                return {user: updateUser, message: 'Usuário atualizado com sucesso!'}
            } else {
                const dadosDto = plainToInstance(UserEntity, dadoUser);
                const updateUser = await this.UserRepository.update(id, dadosDto);
                console.log(erros.length)
        
                return {user: updateUser, message: 'Usuário atualizado com sucesso!'}
            }
        } catch(e) {
            return e.error;
        }
    }

    async userDelete(id: string){
        //verificar se a categoria está sendo usada em um livro
        const deleteUser = await this.UserRepository.delete(id);

        return {user: deleteUser, message: 'User Excluido com sucesso!'}
    }    
}