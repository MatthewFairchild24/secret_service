import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";
import { ServiceDto } from "./dto/serviceDto.dto";
import { ServiceMapper } from "./dto/service.mappper";


@Controller('service')
export class ServiceController{
    constructor(private readonly service:ServiceService){}

    @Post()
    async create(@Body() dto:CreateServiceDto):Promise<ServiceDto>{
        const serv = await this.service.create(dto)
        return ServiceMapper.toDo(serv)
    }

    @Get()
    async findAll():Promise<ServiceDto[]>{
        const serv = await this.service.findAll()
        return serv.map(ServiceMapper.toDo)
    }

    @Get(':id')
    async findOne(@Param('id') id:number){
        const serv = await this.service.findOne(id)
        return ServiceMapper.toDo(serv)
    }

    @Patch(':id')
    async update(@Param('id') id:number, dto:UpdateServiceDto){
        const serv = await this.service.update(id, dto)
        return ServiceMapper.toDo(serv) 
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.service.remove(id)
    }
}