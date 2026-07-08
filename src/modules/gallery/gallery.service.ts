import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gallery } from "./gallery.entity";
import { Repository } from "typeorm";
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { UpdateGalleryDto } from "./dto/update-gallery.dto";


@Injectable()
export class GalleryService{
    constructor(
        @InjectRepository(Gallery)
        private readonly repo:Repository<Gallery>
    ){}

    async create(data: Partial<Gallery>):Promise<Gallery>{
        const gallery = await this.repo.create(data)
        return this.repo.save(gallery)
    }

    async findAll():Promise<Gallery[]>{
        return this.repo.find()
    }           

    async findOne(id: number):Promise<Gallery>{
        const gallery = await this.repo.findOne({where:{id}})
        if(!gallery) throw new NotFoundException('Gallery was not found')
        return gallery
    }

    async update(id:number, dto:UpdateGalleryDto){
        const gallery = await this.findOne(id)
        Object.assign(gallery, dto)
        return this.repo.save(gallery)
    }

    async remove(id: number){
        const gallery = await this.findOne(id)
        this.repo.delete(gallery)
        return { message:"Gallery was deleted"}
    }
}