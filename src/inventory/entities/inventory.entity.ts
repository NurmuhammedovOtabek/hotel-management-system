import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    itemName:string

    @Column({nullable:false})
    quantity:number
}
