import { Module } from "@nestjs/common";
import { AddressController } from "./addressController"
import { AddressRepository } from "./addressRepository";
import { IsValidCepConstraint, isImcompleteAddress, isSingleAddress } from "src/validator/AddressValidate";
import { AddressService } from "./addressService";

@Module({
    controllers: [AddressController],
    providers:[AddressService, AddressRepository, isSingleAddress, IsValidCepConstraint, isImcompleteAddress],
    exports: [AddressService]
})
export class AddressModule{}