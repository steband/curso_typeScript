import { Injectable } from "@nestjs/common";
import { CategoryEntity } from "./categoryEntity";
import { UpdateCategoryDTO } from "./dto/UpdateCategoryDTO";
import slugify from "slugify";

@Injectable()
export class CategoryRepository{
    private categorys:CategoryEntity[] = [];

    async save(category: CategoryEntity){
        category.slugName = this.convertSlug(category.name)
        this.categorys.push(category);
    }

    async update (id: string, category: UpdateCategoryDTO){
        try{
            const categoryUpdate = this.categoryFindID(id);
            category.slugName = this.convertSlug(category.name);
            Object.entries(category).forEach(([chave, valor]) => {
                if (chave === 'id'){
                    return
                }
                categoryUpdate[chave] = valor;
            })
            return categoryUpdate;
        } catch (e){
            return e.message;
        }
    }

    async delete(id: string){
        try{
            const CategoryDelete = this.categoryFindID(id);
            this.categorys = this.categorys.filter(x => x.idCategory !== id)
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
        let categoryFind: CategoryEntity[]
        try{
            switch (chave) {
            case 'id':
                categoryFind = [this.categoryFindID(valor)]
                break;
            
            default:
                categoryFind = this.categorys
                break;
            }
            return categoryFind
        } catch(e) {
            return e.message
        }

    }

    private categoryFindID(id: string){
        const categoryFind = this.categorys.find(category => category.idCategory === id)
        if (!categoryFind){
            throw new Error('Autor não existe!')
        }
        return categoryFind;
    }

    private convertSlug(slug: string){
        const convert = slugify(slug, {lower: true});
        return convert;
    }     

}