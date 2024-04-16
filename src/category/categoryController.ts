import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { SaveCategoryDTO } from "./dto/SaveCategoryDTO";
import { CategoryEntity } from "./categoryEntity";
import { UpdateCategoryDTO } from "./dto/UpdateCategoryDTO";
import { CategoryService } from "./categoryService";


@Controller('/Categorys')
export class CategoryController {
    constructor(private CategoryService: CategoryService){}

    @Get()
    async categoryFind(@Query() query: { [key: string]: string }) {
        const parametro = Object.entries(query)[0];
        return this.CategoryService.findCategory(parametro)
      }

    @Post()
    async categorySave(@Body() dadoCategory: SaveCategoryDTO){
        const Category = new CategoryEntity();
        Category.name = dadoCategory.name;
        this.CategoryService.saveCategory(Category);
        return {id: Category.idCategory, nome: Category.name, message: 'Categoria incluida com sucesso!'}
    }

    @Put('/:id')
    async categoryUpdate(@Param('id') id: string, @Body() dadoCategory: UpdateCategoryDTO){
        const Category = new CategoryEntity();
        Category.name = dadoCategory.name;

        const updateCategory = await this.CategoryService.updateCategory(id, Category);

        return {autor: updateCategory, message: 'Categoria atualizada com sucesso!'}
    }

    @Delete('/:id')
    async categoryDelete(@Param('id') id: string){
        //verificar se a categoria está sendo usada em um livro
        const deleteCategory = await this.CategoryService.deleteCategory(id);

        return {autor: deleteCategory, message: 'Categoria Excluida com sucesso!'}
    }
}

