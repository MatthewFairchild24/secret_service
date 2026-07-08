import { IsInt, IsOptional, IsString } from "class-validator";


export class CreateServiceDto{

    @IsString()
    title!: string

    @IsString()
    preview_text!:string

    @IsOptional()
    @IsString()
    description!:string

    @IsOptional()
    @IsInt()
    image_id_0!:number

    @IsOptional()
    @IsInt()
    image_id_1!:number

}