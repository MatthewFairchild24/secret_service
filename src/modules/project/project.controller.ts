
import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CreateProjectDto } from "./dto/create-project.dto";
import { ProjectService } from "./project.service";
import { UpdateProjectDto } from "./dto/update-project.dto";


@Controller('project')
export class ProjectController{
    constructor(private readonly service: ProjectService){}

    @Post()
    create(@Body() dto:CreateProjectDto){
        return this.service.create(dto)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get()
    findOne(@Param('id') id:number){
        return this.service.findOne(id)
    }

    @Patch()
    update(@Param('id') id:number, @Body() dto: UpdateProjectDto){
        return this.service.update(id, dto)
    }

    @Delete()
    remove(@Param('id') id:number){
        return this.service.remove(id)
    }
}