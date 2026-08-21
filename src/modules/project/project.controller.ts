
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { ProjectMapper } from "./dto/project.mapper";


@Controller('project')
export class ProjectController{
    constructor(private readonly service: ProjectService){}

    @Post()
    async create(@Body() dto:CreateProjectDto){
        const proj = await this.service.create(dto)
        return ProjectMapper.toDo(proj)
    }

    @Get()
    async findAll(){
        const proj = await this.service.findAll()
        return proj.map(ProjectMapper.toDo)
    }

    @Get()
    async findOne(@Param('id') id:number){
        const proj = await this.service.findOne(id)
        return ProjectMapper.toDo(proj)
    }

    @Patch()
    async update(@Param('id') id:number, @Body() dto: UpdateProjectDto){
        const proj = await this.service.update(id, dto)
        return ProjectMapper.toDo(proj)
    }

    @Delete()
    remove(@Param('id') id:number){
        return this.service.remove(id)
    }
}