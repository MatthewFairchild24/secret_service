import { IsString, Length } from "class-validator"

export class CreateAdminDto{
    @IsString()
    @Length(50)
    login!: string

    @IsString()
    @Length(80)
    password!: string

}