import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SaveAuthorDTO } from "./dto/SaveAuthorDTO";
import { AuthorEntity } from "./authorEntity";
import { v4 as uuid } from "uuid";
import { UpdateAuthorDTO } from "./dto/UpdateAuthorDTO";
import { AuthorService } from "./authorService";


@Controller('/authors')
export class AuthorController {
    constructor(private authorService: AuthorService){}

    @Get()
    async Authorfind(@Query() query: { [key: string]: string }) {
        const parametro = Object.entries(query)[0];
        return this.authorService.findAuthor(parametro)
      }

    @Post()
    async Authorsave(@Body() dadoAuthor: SaveAuthorDTO){
        const author = new AuthorEntity();

        author.name = dadoAuthor.name;
        author.email = dadoAuthor.email;
        author.bio = dadoAuthor.bio;
        author.idAuthor = uuid();
        this.authorService.saveAuthor(author);
        return {id: author.idAuthor, nome: author.name, message: 'Autor incluido com sucesso!'}
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() dadoAuthor: UpdateAuthorDTO){
        const author = new AuthorEntity();

        author.name = dadoAuthor.name;
        author.email = dadoAuthor.email;
        author.bio = dadoAuthor.bio;
        const updateAuthor = await this.authorService.updateAuthorDTO(id, author);

        return {autor: updateAuthor, message: 'Autor atualizado com sucesso!'}
    }

    @Delete('/:id')
    async AuthorDelete(@Param('id') id: string){
        const deleteAuthor = await this.authorService.deleteAuthor(id);

        return {autor: deleteAuthor, message: 'Autor Excluido com sucesso!'}
    }
}

