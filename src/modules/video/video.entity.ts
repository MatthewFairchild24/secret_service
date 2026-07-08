import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/browser";


@Entity('videos')
export class Video{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({type:'character varying', length:50})
    originalName!: string

    @Column()
    fileName!: string

    @Column()
    mimeType!: string 

    @Column()
    size!: number

    @Column()
    path!: string

    @Column({type:'timestamp', default:() => "CURRENT_TIMESTAMP"})
    created_at!: Date
}