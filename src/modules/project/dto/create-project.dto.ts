import { IsInt, IsString } from "class-validator";


export class CreateProjectDto{
    @IsString()
    title!: string

    @IsString()
    description_0!: string

    @IsString()
    description_1!: string

    @IsString()
    description_2!: string

    @IsString()
    short_text!: string

    @IsInt()
    image_id_0!: number

    @IsInt()
    image_id_1!: number

    @IsString()
    video_id!: string

}