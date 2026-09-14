import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectCategories } from "./project_сategories.entity";
import { Repository } from "typeorm";
import { CreateProjectCategoriesDto } from "./dto/create-project_сategories.dto";
import { UpdateProjectCategoriesDto } from "./dto/update-project_сategories.dto";


@Injectable()
export class ProjectCategoriesService{
    constructor(
        @InjectRepository(ProjectCategories)
        private readonly repo: Repository<ProjectCategories>
    ){}

    async create(dto:CreateProjectCategoriesDto):Promise<ProjectCategories>{
        const projectCategories = await this.repo.create(dto)
        return this.repo.save(projectCategories)
    }

    async findAll():Promise<ProjectCategories[]>{
        return this.repo.find()
    }

    async findOne(id: number):Promise<ProjectCategories>{
        const projectCategories = await this.repo.findOne({where: {id}})    
        if(!projectCategories) throw new NotFoundException("Categories not found")
        return projectCategories
    }

    async update(id: number, dto: UpdateProjectCategoriesDto):Promise<ProjectCategories>{
        const projectCategories = await this.findOne(id)
        Object.assign(projectCategories, dto)
        return this.repo.save(projectCategories)
    }

    async remove(id:number){
        const projectCategories = await this.findOne(id)
        await this.repo.delete(projectCategories)

        return {message: "Categories was deleted"}
    }
}