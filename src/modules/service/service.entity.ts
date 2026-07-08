import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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

    @Column({type: 'int',nullable: true})
    image_id_0!: number

    @Column({type: 'int',nullable: true})
    image_id_1!: number
}