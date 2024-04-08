import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { SaveUserDTO } from "./dto/SaveUserDTO";
import { UserEntity } from "./UserEntity";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UserAddressEntity } from "./userAddressEntity";
import axios from "axios";
import { AddressEntity } from "src/address/addressEntity";
import { UserService } from "./userService"

@Controller('/Users')
export class UserController {
    constructor(private UserService: UserService){}

        private readonly addressServiceUrl = 'http://localhost:3000/addresses'
    @Get()
    async userFind(@Query() query: { [key: string]: string }) {
        const parametro = Object.entries(query)[0];
        return this.UserService.userFind(parametro)
      }

    @Post()
    async Save(@Body() dadoUser: any){
        return this.UserService.Save(dadoUser);
    }

    @Put('/:id')
    async UserUpdate(id: string, dadoUser: any){
        return this.UserService.UserUpdate(id, dadoUser)
    }

    @Delete('/:id')
    async userDelete(@Param('id') id: string){
        //verificar se a categoria está sendo usada em um livro
        return await this.UserService.userDelete(id);
    }
}

