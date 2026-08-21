
export class ProjectDto{
    id!: number
    title!: string
    description_0?: string
    description_1?: string
    description_2?: string
    short_text!: string
    image_0!:{
        id:number,
        url: string
    } | null

    image_1!:{
        id: number,
        url: string
    } | null

    video!:{
        id: string,
        url: string
    } | null
}