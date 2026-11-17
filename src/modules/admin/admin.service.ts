import {BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Admin } from "./admin.entity";
import { Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import * as bcrypt from "bcrypt"
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AdminService{
    constructor(
        @InjectRepository(Admin)
        private readonly repo: Repository<Admin>,
        private readonly jwt: JwtService
    ){}

    async create(dto: CreateAdminDto):Promise<Admin>{
        const exist = await this.repo.findOne({where:{login: dto.login}})
        if(exist) throw new BadRequestException("Admin already exists")
        const hashed = await bcrypt.hash(dto.password, 10)
        const admin = this.repo.create({...dto, password_hash: hashed})
        return this.repo.save(admin)
    }

    async login(login:string, password: string){
        const admin = await this.repo.findOne({
            where: {login},
            select: {
                id: true,
                login: true,
                password_hash: true,
            },
        })

        if(!admin) throw new UnauthorizedException('Неверный логин или пароль')
        
        const match = await bcrypt.compare(password, admin.password_hash)
        if(!match) throw new UnauthorizedException('Неверный логин или пароль')

        const payload = {sub: admin.id, login: admin.login}
        const accessToken = this.jwt.sign(payload)

        return { accessToken }
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