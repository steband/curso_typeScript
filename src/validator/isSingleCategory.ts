import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { CategoryRepository } from "../category/categoryRepository";
import { Injectable } from "@nestjs/common";

@Injectable()
@ValidatorConstraint({async: true})
export class  isSingleCategory implements ValidatorConstraintInterface{
    constructor(private categoryRepositiry: CategoryRepository){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const possivelOperacao = validationArguments?.constraints[0];
        const usurioComEmailExite = await this.categoryRepositiry.haveCategory(value, possivelOperacao)

        return !usurioComEmailExite;
    }
}

export const IsSingle = (opcoesDeValidacao: ValidationOptions, operation: 'insert' | 'update') => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName:propriedade,
            options: opcoesDeValidacao,
            constraints:[operation],
            validator: isSingleCategory
        })
    }
}





