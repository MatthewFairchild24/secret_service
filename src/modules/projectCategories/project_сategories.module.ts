import { Module } from "@nestjs/common";
import { ProjectCategoriesController } from "./project_сategories.controller";
import { ProjectCategoriesService } from "./project_сategories.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectCategories } from "./project_сategories.entity";


@Module({
    imports:[TypeOrmModule.forFeature([ProjectCategories])],
    providers: [ProjectCategoriesService],
    controllers:[ProjectCategoriesController]
})
export class ProjectCategoriesModule{}