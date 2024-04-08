import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SaveCategoryDTO } from "./dto/SaveCategoryDTO";
import { CategoryEntity } from "./categoryEntity";
import { v4 as uuid } from "uuid";
import { UpdateCategoryDTO } from "./dto/UpdateCategoryDTO";
import { CategoryRepository } from "./categoryRepository";


@Controller('/Categorys')
export class CategoryController {
    constructor(private CategoryRepository: CategoryRepository){}

    @Get()
    async categoryFind(@Query() query: { [key: string]: string }) {
        const parametro = Object.entries(query)[0];
        return this.CategoryRepository.find(parametro)
      }

    @Post()
    async categorySave(@Body() dadoCategory: SaveCategoryDTO){
        const Category = new CategoryEntity();
        Category.name = dadoCategory.name;
        Category.id = uuid();
        this.CategoryRepository.save(Category);
        return {id: Category.id, nome: Category.name, message: 'Categoria incluida com sucesso!'}
    }

    @Put('/:id')
    async categoryUpdate(@Param('id') id: string, @Body() dadoCategory: UpdateCategoryDTO){
        const updateCategory = await this.CategoryRepository.update(id, dadoCategory);

        return {autor: updateCategory, message: 'Categoria atualizada com sucesso!'}
    }

    @Delete('/:id')
    async categoryDelete(@Param('id') id: string){
        //verificar se a categoria está sendo usada em um livro
        const deleteCategory = await this.CategoryRepository.delete(id);

        return {autor: deleteCategory, message: 'Categoria Excluida com sucesso!'}
    }
}

