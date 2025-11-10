import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Room } from "../../rooms/entities/room.entity";
import { Staff } from "../../staffs/entities/staff.entity";

@Entity()
export class Roomclean {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.roomclean)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => Staff, (staff) => staff.roomclean)
  @JoinColumn({ name: "staffId" })
  staff: Staff;

  @Column()
  staffId: number;

  @Column({default: new Date()})
  cleaningDate:Date

  @Column()
  notes:string
}
