import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({type:'int', nullable:true})
    image_id_0!: number

    @Column({type:'int', nullable:true})
    image_id_1!: number

    @Column({type:'int', nullable:true})
    video_id!: string
}