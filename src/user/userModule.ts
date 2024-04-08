import { Module } from "@nestjs/common";
import { UserController } from "./userController";
import { UserRepository } from "./userRepository";
import { IsTypeValidator, IsValidCpfConstraint, IsValidPhoneConstraint } from "src/validator/UserValidator";
import { AddressModule } from "src/address/addressModule";
import { UserService } from "./userService";

@Module({
    imports:[AddressModule],
    controllers: [UserController],
    providers:[UserService, UserRepository, IsValidPhoneConstraint, IsValidCpfConstraint, IsTypeValidator]
})
export class UserModule{}