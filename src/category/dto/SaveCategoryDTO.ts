import { Optional } from "@nestjs/common";
import { IsNotEmpty } from "class-validator";
import { IsSingle } from "src/validator/isSingleCategory";

export class SaveCategoryDTO {
  @IsNotEmpty({message: 'Por favor, infome o nome do autor'})
  @IsSingle({message: 'Esta categoria ja existe!'}, 'insert')
  name: string;
  @Optional()
  slugName: string;
  };