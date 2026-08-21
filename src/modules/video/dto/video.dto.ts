export class VideoDTO{
    id!: string
    title!: string
    video_path!:string
    thumbnail_path?: string
    duration?: number
    mimeType?: string
    size?: number
    created_at!: Date
}