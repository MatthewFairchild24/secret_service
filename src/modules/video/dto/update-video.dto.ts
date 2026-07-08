import { PartialType } from "@nestjs/mapped-types";
import { Video } from "../video.entity";


export class UpdateVideoDto extends PartialType(Video){}