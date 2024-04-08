import { Module } from "@nestjs/common";
import { AuthorController } from "./authorController"
import { AuthorRepository } from "./authorRepository";
import { EmailAuthorValidator } from "src/validator/emailAuthorValidator";

@Module({
    controllers: [AuthorController],
    providers:[AuthorRepository, EmailAuthorValidator]
})
export class AuthorModule{}