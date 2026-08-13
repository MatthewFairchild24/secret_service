export class ServiceDto{
    id!:number
    title!: string
    preview_text!: string
    description!: string

    image_0!:{
        id: number
        url: string
    } | null    

    image_1!:{
        id: number
        url: string
    } | null

    icon!:{
        id: number
        url: string
    } | null
}