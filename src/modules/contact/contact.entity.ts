import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('contact')
export class Contact{
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    type!: string //phone, address, messanger ...

    @Column()
    label!: string 

    @Column()
    value!: string

    @Column({nullable: true})
    icon!: string

    @Column({type:'int', default: 0})
    order!: number

    @Column({default: true})
    is_active!: boolean

    @Column({type:"timestamp", default:() => "CURRENT_TIMESTAMP"})
    update_at!  : Date

}