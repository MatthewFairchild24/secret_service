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
        const project = await this.repo.create({
            title: dto.title,
            description_0: dto.description_0,
            description_1: dto.description_1,
            description_2: dto.description_2,
            short_text: dto.short_text,
            image_0: dto.image_id_0 ? {id: dto.image_id_0} : undefined,
            image_1: dto.image_id_1 ? {id: dto.image_id_1} : undefined,
            video: dto.video_id ? {id: dto.video_id} : undefined
        })
        return this.repo.save(project)
    }

    async findAll():Promise<Project[]>{
        return this.repo.find({
            relations:{
                image_0: true,
                image_1: true,
                video: true
            }
        })
    }

    async findOne(id:number):Promise<Project>{
        const project = await this.repo.findOne({
            where:{id},
            relations:{
                image_0:true,
                image_1: true,
                video: true
            }})
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