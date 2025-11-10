import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../rooms/entities/room.entity";
import { Inventory } from "../../inventory/entities/inventory.entity";

@Entity()
export class RoomInventory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.roomInventory)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => Inventory, (inventory) => inventory.roomInventory)
  @JoinColumn({ name: "inventoryId" })
  inventory: Inventory;

  @Column()
  inventoryId: number;

  @Column({nullable:false})
  quantity: number;

  @Column()
  notes: string;
}
