import { PartialType } from "@nestjs/mapped-types";
import { ProjectCategories } from "../project_сategories.entity";


export class UpdateProjectCategoriesDto extends PartialType(ProjectCategories){}