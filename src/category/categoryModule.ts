import { Module } from "@nestjs/common";
import { CategoryController } from "./categoryController"
import { isSingleCategory } from "src/validator/isSingleCategory";
import { CategoryService } from "./categoryService";

@Module({
    controllers: [CategoryController],
    providers:[CategoryService, isSingleCategory]
})
export class CategoryModule{}