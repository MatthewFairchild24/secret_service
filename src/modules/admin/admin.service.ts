import {BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";


@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Admin)
        private readonly repo: Repository<Admin>
    ){}

    async create(dto: CreateAdminDto):Promise<Admin>{
        const exist = await this.repo.findOne({where:{login: dto.login}})
        if(exist) throw new BadRequestException("Admin already exists")
        const admin = await this.repo.create(dto)
        return this.repo.save(admin)
    }

    async findAll():Promise<Admin[]>{
        return this.repo.find()
    }

    async findOne(id: number):Promise<Admin>{
        const admin = await this.repo.findOne({where: {id}})
        if (!admin)  throw new NotFoundException('Admin not found')

        return admin
    }

    async update(id: number, dto: UpdateAdminDto){
        const admin = await this.findOne(id)
        Object.assign(admin, dto)
        return this.repo.update(id, dto)
    }

    async remove(id: number){
        const admin = await this.findOne(id)
        await this.repo.delete(admin)
        return {message: "Admin was deleted"}
    }
}