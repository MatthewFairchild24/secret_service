import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";


export class CreateContactDto{
    @IsString()
    type!: string

    @IsString()
    label!: string

    @IsString()
    value!: string

    @IsOptional()
    @IsString()
    icon?: string

    @IsOptional()
    @IsInt()
    order?: number

    @IsOptional()
    @IsBoolean()
    is_active?: boolean
}