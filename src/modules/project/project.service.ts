import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "./project.entity";
import { Repository } from "typeorm";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";


@Injectable()
export class ProjectService{
    constructor(
        @InjectRepository(Project)
        private readonly repo: Repository<Project>
    ){}

    async create(dto: CreateProjectDto):Promise<Project>{
        const project = await this.repo.create(dto)
        return this.repo.save(project)
    }

    async findAll():Promise<Project[]>{
        return this.repo.find()
    }

    async findOne(id:number):Promise<Project>{
        const project = await this.repo.findOne({where:{id}})
        if(!project) throw new NotFoundException('Project not found')
        
        return project
    }

    async update(id:number, dto:UpdateProjectDto):Promise<Project>{
        const project = await this.findOne(id)
        Object.assign(project, dto)
        return this.repo.save(project)
    }

    async remove(id:number){
        const project = await this.findOne(id)
        this.repo.delete(project)

        return {message: 'Project was deleted'}
    }
}