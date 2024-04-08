import { Optional } from "@nestjs/common";
import { IsNotEmpty} from "class-validator";

export class UpdateCategoryDTO {
    @IsNotEmpty({message: 'Por favor, infome o nome do autor'})
    // @IsSingle({message: 'Esta categoria ja existe!'},'update')
    @Optional()
    name: string;
    @Optional()
    slugName: string;
  }