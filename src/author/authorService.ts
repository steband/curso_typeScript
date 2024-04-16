import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthorEntity } from "./authorEntity";
import { ObjectId, Repository } from "typeorm";

@Injectable()
export class AuthorService{
    constructor(
        @InjectRepository(AuthorEntity)
        private readonly authorRepository: Repository<AuthorEntity>,
    ){}
    async saveAuthor(author: AuthorEntity){
        await this.authorRepository.save(author);
    }
    async updateAuthorDTO(id, author: AuthorEntity){
        const userUpdate = await this.authorRepository.findOneBy({idAuthor: id});
        Object.assign(userUpdate, author);
        await this.authorRepository.save(userUpdate);
    }

    async deleteAuthor(id){
        this.authorRepository.delete(id);
    }

    async findAuthor(param){
        try{
            let chave:string = '', valor:string = ''
            if (param){
                chave = param[0]
                valor = param[1];
            }
            let authorFind
            switch (chave) {
            case 'id':
                authorFind = await this.authorRepository.find({where: {idAuthor: valor}});
                break;
            
            case 'email':
                authorFind = await this.authorRepository.find({where: {email: valor}});
     
                break;
            
            default:
                authorFind = await this.authorRepository.find();
                break;
            }
            return authorFind
        } catch(e) {
            return e.message
        }
    }    
    async existeComEmail(email: string){
        const authorEmail = await this.authorRepository.find({where: {email: email}}
        );
        console.log(authorEmail.length)
        return authorEmail.length !== 0;
    }

}   
