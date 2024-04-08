import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { AddressEntity } from "./addressEntity";
import { AddressService } from "./addressService"
import { SaveAddressDTO } from "./dto/SaveAddressDTO";


@Controller('/Addresses')
export class AddressController {
    constructor(private AddressService: AddressService){}

    @Get()
    async addressFind(@Query() query: { [key: string]: string }) {
        console.log('addressFind controller')
        const parametro = Object.entries(query)[0];
        return this.AddressService.addressFind(parametro);
      }

    @Post()
    async addressSave(@Body() dadoAddress: any){
        const address: AddressEntity = dadoAddress;
        return this.AddressService.addressSave(address);
    }

    @Put('/:id')
    async addressUpdate(@Param('id') id: string, @Body() dadoAddress: AddressEntity){
        return await this.AddressService.addressUpdate(id, dadoAddress);
    }

    @Delete('/:id')
    async addressDelete(@Param('id') id: string){
        return await this.AddressService.addressDelete(id);
    }
}

