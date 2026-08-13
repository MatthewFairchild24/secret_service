import { Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { VideoService } from "./video.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { v4 as uuidv4 } from "uuid";
import type {Response, Request} from "express"
import { CreateVideoDto } from "./dto/create-video.dto";
import { UpdateVideoDto } from "./dto/update-video.dto";
import { Video } from "./video.entity";


@Controller('videos')
export class VideoController{
    constructor(private readonly service: VideoService){}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor("file", {
            storage: diskStorage({
                destination: './uploads/videos',
                filename: (req, file, cb) => {
                    const ext = file.originalname.split(".").pop()
                    cb(null, `${uuidv4()}.${ext}`)  
                }

            })
        })
    )
    async uploadVideo(@UploadedFile() file: Express.Multer.File){
        const data: Partial<Video> = {
            originalName: file.originalname,
            fileName: file.filename,
            mimeType: file.mimetype,
            size: file.size,
            path: file.path
        }
        return this.service.create(data)
    }

    @Patch(":id")
    async update(@Param('id') id: string, @Body() dto: UpdateVideoDto){
        return this.service.update(id, dto)
    }

    @Delete(":id")
    async remove(@Param('id') id:string){
        return this.service.remove(id)
    }

    @Get(":id")
    async streamVideo(@Param('id') id:string, @Req() req:Request, @Res() res:Response){
        const video = await this.service.findOne(id)
        
        const range = req.headers['range']

        const {statusCode, headers, stream} = this.service.getVideoStream(
            video.path, 
            range,
            video.mimeType || "video/mp4"
        )

        res.writeHead(statusCode, headers)
        stream.pipe(res)
    }
}