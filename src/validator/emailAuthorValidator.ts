import { Injectable } from "@nestjs/common";
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { AuthorRepository } from "../author/authorRepository";

@Injectable()
@ValidatorConstraint({async: true})
export class EmailAuthorValidator implements ValidatorConstraintInterface{
    constructor( private authorRepository: AuthorRepository){}
    

    async validate(value: any, ValidationArguments?: ValidationArguments): Promise<boolean>{
        const authorEmail = await this.authorRepository.existeComEmail(value)
        return !authorEmail
    }
}

export const EmailUnico =  (opcoesValidacao: ValidationOptions) => {
    return (object: Object, propriedade: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propriedade,
            options: opcoesValidacao,
            constraints: [],
            validator: EmailAuthorValidator
        })
    }
}


// import { Injectable } from "@nestjs/common";
// import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";

// @Injectable()
// @ValidatorConstraint({ async: true })
// export class GenericAsyncValidator implements ValidatorConstraintInterface {
//     constructor(private service: any) {}

//     async validate(value: any, args?: ValidationArguments): Promise<boolean> {
//         if (!args.constraints || args.constraints.length < 2) {
//             throw new Error('Invalid validator configuration');
//         }

//         const [methodName, methodArgs] = args.constraints;
//         const method = this.service[methodName];

//         if (!method) {
//             throw new Error(`Method ${methodName} not found on the validation service`);
//         }

//         return method.call(this.service, value, ...methodArgs);
//     }
// }

// export const IsUnique = (service: any, methodName: string, methodArgs: any[] = [], validationOptions?: ValidationOptions) => {
//     return (object: Object, propertyName: string) => {
//         registerDecorator({
//             target: object.constructor,
//             propertyName: propertyName,
//             options: validationOptions,
//             constraints: [methodName, methodArgs],
//             validator: GenericAsyncValidator,
//             async: true
//         });
//     };
// };