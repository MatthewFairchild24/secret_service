import { IsInt, IsString } from "class-validator";


export class CreateVideoDto{

    @IsString()
    originalName!: string
}