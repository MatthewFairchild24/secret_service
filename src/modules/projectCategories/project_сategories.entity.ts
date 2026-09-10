import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('project_categories')
export class ProjectCategories{
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type:'text'})
    name!: string
}