import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true, nullable:false})
    name:string

    @Column()
    description:string

    @Column({nullable: false})
    price:number

    @CreateDateColumn()
    createAt:Date

    @UpdateDateColumn()
    updateAt:Date
}
