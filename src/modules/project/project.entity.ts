import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gallery } from "../gallery/gallery.entity";
import { Video } from "../video/video.entity";
import { ProjectCategories } from "../projectCategories/project_сategories.entity";


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

    @ManyToOne(() => Gallery,{
        onDelete: "SET NULL",
        nullable: true
    })
    @JoinColumn({name:'image_id_0'})
    image_0!:Gallery | null

    @ManyToOne(() => Gallery,{
        onDelete: "SET NULL",
        nullable: true
    })
    @JoinColumn({name:'image_id_1'})
    image_1!:Gallery | null

    @ManyToOne(() => Video,{
        onDelete: "SET NULL",
        nullable: true
    })
    @JoinColumn({name: 'video_id'})
    video!: Video | null

    @ManyToOne(() => ProjectCategories,{
        onDelete: "SET NULL",
        nullable: true
    })
    @JoinColumn({name: 'categories_id'})
    category!:ProjectCategories | null

   
}