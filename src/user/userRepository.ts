import { Injectable } from "@nestjs/common";
import { UserEntity } from "./UserEntity";
import { UpdateUserDTO } from "./dto/UpdateUserDTO";

@Injectable()
export class UserRepository{
    private users:UserEntity[] = [];

    async save(user: UserEntity){
        this.users.push(user);
    }

    async update (id: string, user: UpdateUserDTO){
        try{
            const userUpdate = this.userFindID(id);
            Object.entries(user).forEach(([chave, valor]) => {
                if (chave === 'id'){
                    return
                }
                userUpdate[chave] = valor;
            })
            return userUpdate;
        } catch (e){
            return e.message
        }
    }

    async delete(id: string){
        try{
            const CategoryDelete = this.userFindID(id);
            this.users = this.users.filter(x => x.id !== id)
            return CategoryDelete;
        } catch ( e ) {
            return e.message
        }
    }

    async find(param){
        let [chave, valor] = ''

        if (param){
            [chave, valor] = param;
        }
        let categoryFind: UserEntity[]
        try{
            switch (chave) {
            case 'id':
                categoryFind = [this.userFindID(valor)]
                break;
            
            default:
                categoryFind = this.users
                break;
            }
            return categoryFind
        } catch(e) {
            throw new Error(e.message)
        }

    }

    private userFindID(id: string){
        const userFind = this.users.find(u => u.id === id)
        if (!userFind){
            throw new Error('Autor não existe!')
        }
        return userFind;
    }

    async haveEmailUser(email: string){
        let findUser: UserEntity
        findUser = this.users.find(u => u.email === email)
        return findUser !== undefined
    }

    async havePhoneUser(phone: string){
        let findUser: UserEntity
        findUser = this.users.find(u => u.phone === phone)
        return findUser !== undefined
    }

    async haveCpfUser(cpf: string){
        let findUser: UserEntity
        findUser = this.users.find(u => u.cpf === cpf)
        return findUser !== undefined
    }
}