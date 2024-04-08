import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { AddressRepository } from "../address/addressRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class  isSingleAddress implements ValidatorConstraintInterface{
    constructor(private addressRepositiry: AddressRepository){}
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        console.log('SingleValidator')

        const fields = validationArguments.constraints[0] as string[];
        const valueToCheck = fields.reduce((obj, field) => ({ ...obj, [field]: validationArguments.object[field] }), {});

        let zipcode:string;
        let number:string;
        let complement:string;
        let usurioComEmailExite: boolean;
        if(valueToCheck['zipcode'] && valueToCheck['number'] && valueToCheck['complement']){
            usurioComEmailExite = valueToCheck['zipcode'];
            number = valueToCheck['number'];
            complement = valueToCheck['complement'];

            usurioComEmailExite = await this.addressRepositiry.haveAddress(zipcode, Number.parseInt(number.toString()), complement )
        }  else {
            usurioComEmailExite = false;
        }

        return !usurioComEmailExite;
    }
}

export const IsSingle = (opcoesDeValidacao: ValidationOptions, fieldsToValidateTogether?: string[]) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName:propriedade,
            options: opcoesDeValidacao,
            constraints:[fieldsToValidateTogether],
            validator: isSingleAddress
        })
    }
}

@Injectable()
@ValidatorConstraint({ async: true })
export class IsValidCepConstraint implements ValidatorConstraintInterface {
    validate(value: string, args: ValidationArguments): boolean {
        console.log('IsValidCepConstraint')
        if (value !== undefined){
            const cepRegex = /^[0-9]{5}-?[0-9]{3}$/;
            const teste =  typeof value === 'string' && cepRegex.test(value);
            console.log(`resultado: ${teste}; CEP: ${value}`);
            return typeof value === 'string' && cepRegex.test(value);
        } else {
            return true;
        }
    }
}

export const IsValidZipCode = (validationOptions?: ValidationOptions) => {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsValidCepConstraint,
        });
    };
}

@Injectable()
@ValidatorConstraint({async: true})
export class  isImcompleteAddress implements ValidatorConstraintInterface{
    constructor(private addressRepositiry: AddressRepository){}
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        console.log('ImcompleteValidator')

        const fields = validationArguments.constraints[0] as string[];
        const valueToCheck = fields.reduce((obj, field) => ({ ...obj, [field]: validationArguments.object[field] }), {});

        let usurioComEmailExite: boolean;
        if(valueToCheck['zipcode'] === undefined && valueToCheck['number'] === undefined && (valueToCheck['complement'] === undefined && validationArguments.constraints[1])){
            usurioComEmailExite = false;
        }  else if(valueToCheck['zipcode'] === undefined || valueToCheck['number'] === undefined ) { 
            usurioComEmailExite = true;
        } else {
            usurioComEmailExite = false;
        }
        return !usurioComEmailExite;
    }
    
}
export const IsIncompleteZipcode = (opcoesDeValidacao: ValidationOptions, fieldsToValidateTogether: string[], Iscomplement: true | false) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName:propriedade,
            options: opcoesDeValidacao,
            constraints:[fieldsToValidateTogether, Iscomplement],
            validator: isImcompleteAddress
        })
    }
}