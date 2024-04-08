import { Module } from "@nestjs/common";
import { CategoryController } from "./categoryController"
import { CategoryRepository } from "./categoryRepository";
import { isSingleCategory } from "src/validator/isSingleCategory";

@Module({
    controllers: [CategoryController],
    providers:[CategoryRepository, isSingleCategory]
})
export class CategoryModule{}