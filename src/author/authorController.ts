import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SaveAuthorDTO } from "./dto/SaveAuthorDTO";
import { AuthorEntity } from "./authorEntity";
import { v4 as uuid } from "uuid";
import { UpdateAuthorDTO } from "./dto/UpdateAuthorDTO";
import { AuthorRepository } from "./authorRepository";


@Controller('/authors')
export class AuthorController {
    constructor(private authorRepository: AuthorRepository){}

    @Get()
    async Authorfind(@Query() query: { [key: string]: string }) {
        const parametro = Object.entries(query)[0];
        return this.authorRepository.find(parametro)
      }

    @Post()
    async Authorsave(@Body() dadoAuthor: SaveAuthorDTO){
        const author = new AuthorEntity();
        author.name = dadoAuthor.name;
        author.email = dadoAuthor.email;
        author.bio = dadoAuthor.bio;
        author.id = uuid();
        this.authorRepository.save(author);
        return {id: author.id, nome: author.name, message: 'Autor incluido com sucesso!'}
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() dadoAuthor: UpdateAuthorDTO){
        const updateAuthor = await this.authorRepository.update(id, dadoAuthor);

        return {autor: updateAuthor, message: 'Autor atualizado com sucesso!'}
    }

    @Delete('/:id')
    async AuthorDelete(@Param('id') id: string){
        const deleteAuthor = await this.authorRepository.delete(id);

        return {autor: deleteAuthor, message: 'Autor Excluido com sucesso!'}
    }
}

