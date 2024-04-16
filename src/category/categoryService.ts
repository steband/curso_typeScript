import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryEntity } from "./categoryEntity";
import { Repository } from "typeorm";
import slugify from "slugify";

@Injectable()
export class CategoryService{
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoryRepository: Repository<CategoryEntity>){}

    async saveCategory(category: CategoryEntity){
        await this.categoryRepository.save(category);
    }
    async updateCategory(id, author: CategoryEntity){
        const categoryUpdate = await this.categoryRepository.findOneBy({idCategory: id});
        Object.assign(categoryUpdate, author);
        await this.categoryRepository.save(categoryUpdate);
    }

    async deleteCategory(id){
        this.categoryRepository.delete(id);
    }

    async findCategory(param){
        try{
            let chave:string = '', valor:string = ''
            if (param){
                chave = param[0]
                valor = param[1];
            }
            let categoryFind
            switch (chave) {
            case 'id':
                categoryFind = await this.categoryRepository.find({where: {idCategory: valor}});
                break;
            
            // case 'email':
            //     authorFind = await this.categoryRepository.find({where: {email: valor}});
            //     break;
            
            default:
                categoryFind = await this.categoryRepository.find();
                break;
            }
            return categoryFind
        } catch(e) {
            return e.message
        }
    }    


    private convertSlug(slug: string){
        const convert = slugify(slug, {lower: true});
        return convert;
    }        
    async haveCategory(category: string, operacao: string){
        const categorySlug: string = this.convertSlug(category);
        let findCategory
        if (operacao === 'update'){
            findCategory = this.categoryRepository.find({where: {slugName:  categorySlug , name: category}})
        } else {
            findCategory = this.categoryRepository.find({where: {slugName: categorySlug}})
        }
        return findCategory !== undefined
    }
}