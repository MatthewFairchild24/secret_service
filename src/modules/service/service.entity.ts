import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Gallery } from "../gallery/gallery.entity";


@Entity('service')
export class Service{
    @PrimaryGeneratedColumn()
    id!:number

    @Column()
    title!:string

    @Column()
    preview_text!:string

    @Column({nullable: true})
    description!:string

    @ManyToOne(() => Gallery)
    @JoinColumn({name:"image_id_0"})
    image_0!:Gallery

    @ManyToOne(() => Gallery)
    @JoinColumn({name:"image_id_1"})
    image_1!:Gallery

    @ManyToOne(() => Gallery)
    @JoinColumn({name:"icon"})
    icon!:Gallery
}