import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";


@Injectable()
export class ServiceService{
    constructor(
        @InjectRepository(Service)
        private readonly repo: Repository<Service>
    ){}

    async create(dto: CreateServiceDto):Promise<Service>{
        const service = await this.repo.create(dto)
        return this.repo.save(service)
    }

    async findAll():Promise<Service[]>{
        return this.repo.find()
    }

    async findOne(id: number):Promise<Service>{
        const service = await this.repo.findOne({where: {id}})
        if(!service) throw new NotFoundException('Service not found')

        return service
    }

    async update(id:number, dto:UpdateServiceDto):Promise<Service>{
        const service = await this.findOne(id)
        Object.assign(service, dto)
        return this.repo.save(service)
    }

    async remove(id:number){
        const service = await this.findOne(id)
        this.repo.delete(service)

        return {message:'Service was deleted'}
    }

}