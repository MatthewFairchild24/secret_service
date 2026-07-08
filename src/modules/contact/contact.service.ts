import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./contact.entity";
import { Repository } from "typeorm";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";


@Injectable()
export class ContactService{
    constructor(
        @InjectRepository(Contact)
        private readonly repo: Repository<Contact>
    ){}

    async create(dto: CreateContactDto):Promise<Contact>{
        const contact = await this.repo.create(dto)
        return this.repo.save(contact)
    }

    async findAll():Promise<Contact[]>{
        return this.repo.find()
    }

    async findOne(id:string):Promise<Contact>{
        const contact = await this.repo.findOne({where:{id}})
        if(!contact) throw new NotFoundException('Contact not found')
        
        return contact
    }

    async update(id:string , dto: UpdateContactDto):Promise<Contact>{
        const contact = await this.findOne(id)
        Object.assign(contact, dto)
        return this.repo.save(contact)
    }

    async remove(id: string){
        this.repo.delete(id)
        return {message: 'Contact was deleted'}
    }
}