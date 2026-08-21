import { IsInt, IsOptional, IsString } from "class-validator";


export class CreateProjectDto{
    @IsString()
    title!: string

    @IsOptional()
    @IsString()
    description_0!: string

    @IsOptional()
    @IsString()
    description_1!: string

    @IsOptional()
    @IsString()
    description_2!: string

    @IsString()
    short_text!: string

    @IsOptional()
    @IsInt()
    image_id_0!: number

    @IsOptional()
    @IsInt()
    image_id_1!: number

    @IsOptional()
    @IsString()
    video_id!: string

}