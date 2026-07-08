import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";


@Controller("admin")
export class AdminController{
    constructor(
        private readonly service: AdminService
    ){}

    @Post()
    create(@Body() dto: CreateAdminDto){
        return this.service.create(dto)
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.service.findOne(id)
    }

    @Patch(":id")
    update(@Param('id', ParseIntPipe) id:number, @Body() dto:UpdateAdminDto){
        return this.service.update(id, dto)
    }

    @Delete(":id")
    remove(@Param('id', ParseIntPipe) id:number){
        return this.service.remove(id)
    }
}