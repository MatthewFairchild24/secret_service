import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProjectCategoriesService } from "./project_сategories.service";
import { CreateProjectCategoriesDto } from "./dto/create-project_сategories.dto";
import { UpdateProjectCategoriesDto } from "./dto/update-project_сategories.dto";


@Controller('project-categories')
export class ProjectCategoriesController{
    constructor(
        private readonly service: ProjectCategoriesService
    ){}

    @Post()
    async create(@Body() dto:CreateProjectCategoriesDto){
        return await this.service.create(dto)
    }

    @Get()
    async findAll(){
        return await this.service.findAll()
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        return await this.service.findOne(id)
    }

    @Patch(':id')
    async update(@Param('id') id: number, @Body() dto:UpdateProjectCategoriesDto){
        return await this.service.update(id, dto)
    }

    @Delete(':id')
    async remove(@Param('id') id: number){
        return await this.service.remove(id)
    }
}