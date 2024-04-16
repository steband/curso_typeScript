import { Injectable } from "@nestjs/common";
import { AuthorEntity } from "./authorEntity";
import { UpdateAuthorDTO } from "./dto/UpdateAuthorDTO";
import { stringify } from "querystring";

@Injectable()
export class AuthorRepository{
    private authors:AuthorEntity[] = [];

    async save(author: AuthorEntity){
        try{
            this.authors.push(author);
        } catch ( e ){
            return e.message
        }
    }

    async update (id: string, author: UpdateAuthorDTO){
        try{
            const authorUpdate = await this.authorFindID(id);
            Object.entries(author).forEach(([chave, valor]) => {
                if (chave === 'id'){
                    return
                }
                // console.log(`chave ${chave} Valor ${valor}`)
                authorUpdate[chave] = valor;
            })
            return authorUpdate;
        } catch( e ) {
            return e.message
        }
    }

    async delete(id: string){
        try {
            const authorDelete = this.authorFindID(id);
            this.authors = this.authors.filter(x => x.idAuthor !== id)
            return authorDelete;
        } catch ( e ){
            return e.message
        }
    }

    async find(param){
        try{
            let [chave, valor] = ''
            if (param){
                [chave, valor] = param;
            }
            let authorFind: AuthorEntity[]
            switch (chave) {
            case 'id':
                authorFind = [await this.authorFindID(valor)]
                break;
            
            case 'email':
                authorFind = [await this.authorFindEmail(valor)]
     
                break;
            
            default:
                authorFind = this.authors
                break;
            }
            return authorFind
        } catch(e) {
            return e.message
        }

    }

    private async authorFindID(id: string){
        const authorFind = await this.authors.find(author => author.idAuthor === id)
        if (!authorFind){
            throw new Error('Autor não existe!')
        }
        return authorFind;
    }
    private async authorFindEmail(email: string){
        const authorFind = await this.authors.find(author => author.email === email)
        if (!authorFind){
            throw new Error('Autor não existe!')
        }
        return authorFind;
    }




}