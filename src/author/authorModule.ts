import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AuthorController } from "./authorController"
import { AuthorService } from "./authorService";
import { AuthorEntity } from "./authorEntity";
import { EmailAuthorValidator } from "src/validator/emailAuthorValidator";


import { AuthorRepository } from "./authorRepository";


@Module({
    imports: [TypeOrmModule.forFeature([AuthorEntity])],
    controllers: [AuthorController],
    providers:[AuthorService, EmailAuthorValidator], //[AuthorRepository, ]
})
export class AuthorModule{}