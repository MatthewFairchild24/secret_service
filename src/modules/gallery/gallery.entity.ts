import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('gallery')
export class Gallery{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type:'character varying', length:50})
    title!: string

    @Column({type:"text"})
    image_path!: string

    @Column({type:"timestamp", default:() => "CURRENT_TIMESTAMP"})
    created_at!: Date


}