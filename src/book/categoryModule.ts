import { Module } from "@nestjs/common";
import { CategoryController } from "./categoryController"
import { CategoryRepository } from "./categoryRepository";

@Module({
    controllers: [CategoryController],
    providers:[CategoryRepository]
})
export class CategoryModule{}