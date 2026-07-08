import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('admin')
export class Admin{

    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true, length: 50})
    login!: string

    @Column({length: 80})
    password_hash!: string
}