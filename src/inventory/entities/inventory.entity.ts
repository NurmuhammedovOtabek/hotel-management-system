import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RoomInventory } from "../../room-inventory/entities/room-inventory.entity";

@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id:number

    @Column({unique:true})
    itemName:string

    @Column({nullable:false})
    quantity:number

    @OneToMany(() => RoomInventory, (roomInventory) => roomInventory.room)
    roomInventory: RoomInventory[];
}
