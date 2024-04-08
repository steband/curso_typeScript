import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { UserRepository } from "src/user/userRepository";

@Injectable()
@ValidatorConstraint({async: true})
export class IsTypeValidator implements ValidatorConstraintInterface{
    constructor( private userRepository: UserRepository){}

    async validate(value: any, ValidationArguments?: ValidationArguments): Promise<boolean>{
        
        let valueType: any
        const tipo = ValidationArguments?.constraints[0];
        switch (tipo){
            case  'email':
                valueType = await this.userRepository.haveEmailUser(value)
                break;

            case 'phone':
                valueType = await this.userRepository.havePhoneUser(value)
                break;

            case 'cpf':
                 valueType = await this.userRepository.haveCpfUser(value)
                break
        }
            
        return !valueType
    }
}


export const IsSingleUser =  (opcoesValidacao: ValidationOptions, tipo: string) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [tipo],
            validator: IsTypeValidator
        })
    }
}

@Injectable()
@ValidatorConstraint({ async: false })
export class IsValidPhoneConstraint implements ValidatorConstraintInterface {
    validate(cep: string, args: ValidationArguments): boolean {
        const phoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
        return typeof cep === 'string' && phoneRegex.test(cep);
    }
}

export const IsValidPhone = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidPhoneConstraint,
        });
    };
}

@Injectable()
@ValidatorConstraint({ async: false })
export class IsValidCpfConstraint implements ValidatorConstraintInterface {
    validate(cpf: string, args: ValidationArguments): boolean {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

        let sum = 0, remainder;
        for (let i = 1; i <= 9; i++) 
            sum = sum + parseInt(cpf.substring(i-1, i)) * (11 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10)) ) return false;

        sum = 0;
        for (let i = 1; i <= 10; i++) 
            sum = sum + parseInt(cpf.substring(i-1, i)) * (12 - i);
        remainder = (sum * 10) % 11;

        if ((remainder === 10) || (remainder === 11))  remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11) ) ) return false;

        return true;
    }
}

export const IsValidcpf = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCpfConstraint,
        });
    };
}