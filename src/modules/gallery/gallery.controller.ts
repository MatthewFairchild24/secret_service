import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { GalleryService } from "./gallery.service";
import { FileInterceptor } from "@nestjs/platform-express";
import {diskStorage} from 'multer'
import {extname} from 'path'
import { CreateGalleryDto } from "./dto/create-gallery.dto";
import { UpdateGalleryDto } from "./dto/update-gallery.dto";


@Controller('gallery')
export class GalleryController{
    constructor( private readonly service: GalleryService){}

    @Post('upload')
    @UseInterceptors(FileInterceptor('image_path',{
        storage: diskStorage({
            destination: './uploads/gallery',
            filename: (req, file, callback) => {
                const unique = Date.now() + "-" + Math.round(Math.random() * 1e9)
                const ext = extname(file.originalname)
                callback(null, unique + ext)
            }
        })
    }))
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() dto: CreateGalleryDto
    ){
        return this.service.create({
            title: dto.title,
            image_path: `uploads/gallery/${file.filename}`
        })
    }

    @Get()
    findAll(){
        return this.service.findAll()
    }

    @Get(":id")
    findOne(@Param('id') id:number){
        return this.service.findOne(id)
    }

    @Patch(":id")
    update(@Param('id') id:number, @Body() dto: UpdateGalleryDto){
        return this.service.update(id, dto)
    }

    @Patch("upload/:id")
    @UseInterceptors(
        FileInterceptor('image_path', {
            storage: diskStorage({
                destination: 'uploads/gallery',
                filename: (req, file, callback) =>{
                    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9)
                    const ext = extname(file.originalname)
                    callback(null, unique + ext)
                }
            })
        })
    )
    updateWithFile(@Param('id') id:number, @UploadedFile() file:Express.Multer.File, @Body() dto:UpdateGalleryDto ){
        return this.service.update(id, dto)
    }

    @Delete(":id")
    remove(@Param('id') id:number){
        return this.service.remove(id)
    }


}