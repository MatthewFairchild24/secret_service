import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ServiceService } from "./service.service";
import { CreateServiceDto } from "./dto/create-service.dto";
import { UpdateServiceDto } from "./dto/update-service.dto";


@Controller('service')
export class ServiceController{
    constructor(private readonly service:ServiceService){}

    @Post()
    create(@Body() dto:CreateServiceDto){
        return this.service.create(dto)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get(':id')
    findOne(@Param('id') id:number){
        return this.service.findOne(id)
    }

    @Patch(':id')
    update(@Param('id') id:number, dto:UpdateServiceDto){
        return this.service.update(id, dto)
    }

    @Delete(':id')
    remove(@Param('id') id:number){
        return this.service.remove(id)
    }
}