import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateVideoDto } from "./dto/create-video.dto";
import { Video } from "./video.entity";
import { UpdateVideoDto } from "./dto/update-video.dto";
import * as fs from "fs" 


@Injectable()
export class VideoService{
    constructor(
        @InjectRepository(Video)
        private readonly repo: Repository<Video>
    ){}

    async create(data: Partial<Video>):Promise<Video>{
        const video = await this.repo.create(data)
        return this.repo.save(video)
    }

    async findOne(id: string):Promise<Video>{
        const video = await this.repo.findOne({where: {id}})
        if(!video) throw new NotFoundException("Video not found")
        return video
    }

    async update(id: string, dto: UpdateVideoDto):Promise<Video>{
        const video = await this.findOne(id)

        if(typeof dto.originalName === "string"){
            video.originalName = dto.originalName
        }

        return this.repo.save(video)
    }

    async remove(id:string):Promise<{ok:true}>{
        const video = await this.findOne(id)

        try{
            if(video.path && fs.existsSync(video.path)){
                fs.unlinkSync(video.path)
            }
        }catch{
            //Сделано ровно для того, чтобы запрос не падал если файл уже удален
        }

        await this.repo.delete(video)
        return { ok: true}
    }

    getVideoStream(path: string, range: string|undefined, mimeType = "video/mp4"){
        const videoPath = path
        const stat = fs.statSync(videoPath)
        const fileSize = stat.size

        if(!range){
            return{
                statusCode:200,
                headers:{
                    "Content-Length": fileSize,
                    "Content-Type":mimeType,
                },
                stream: fs.createReadStream(videoPath)
            }
        }

        const [startStr, endStr] = range.replace(/bytes=/, "").split("-")
        const start = parseInt(startStr, 10)
        const end = endStr ? parseInt(endStr, 10) : fileSize -1 

        const chunkSize = end - start + 1
        const stream = fs.createReadStream(videoPath, {start, end})

        return{
            statusCode:206,
            headers:{
                "Content-Range": `bytes ${start}-${end}/${fileSize}`,
                "Accept-Range": "bytes",
                "Content-Length": chunkSize,
                "Content-Type": mimeType
            },
            stream,
        }

    }
}