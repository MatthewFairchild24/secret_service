import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gallery } from "../gallery/gallery.entity";
import { Video } from "../video/video.entity";


@Entity('project')
export class Project{
    @PrimaryGeneratedColumn()
    id!:number

    @Column({type: 'text'})
    title!: string

    @Column({type:'text', nullable: true})
    description_0!:string

    @Column({type:'text', nullable: true})
    description_1!:string

    @Column({type:'text', nullable: true})
    description_2!:string

    @Column({type:'text'})
    short_text!:string

    @ManyToOne(() => Gallery)
    @JoinColumn({name:'image_id_0'})
    image_0!:Gallery

    @ManyToOne(() => Gallery)
    @JoinColumn({name:'image_id_1'})
    image_1!:Gallery

    @ManyToOne(() => Video)
    @JoinColumn({name: 'video_id'})
    video!: Video

   
}