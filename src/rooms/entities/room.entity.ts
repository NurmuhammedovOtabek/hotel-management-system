import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Roomclean } from "../../roomclean/entities/roomclean.entity";
import { RoomInventory } from "../../room-inventory/entities/room-inventory.entity";
import { Booking } from "../../bookings/entities/booking.entity";

export enum RType {
  standard = "standard",
  superior = "superior",
  juniorSuite = "junior suite",
  suite = "suite",
  royalSuite = "royal suite",
  deluxe = "deluxe",
  business = "business",
}

export enum BadCount {
  single = "single",
  double = "double",
  twin = "twin",
  triple = "triple",
  quad = "quad",
  penta = "penta",
}

export enum Status {
  available = "available",
  maintenance = "maintenance",
  out_of_service = "out_of_service",
}

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  roomNumber: number;

  @Column({ nullable: false })
  floor: number;

  @Column()
  type: RType;

  @Column()
  badCount: BadCount;

  @Column()
  capacity: number;

  @Column()
  pricePerNight: number;

  @Column({ default: Status.available })
  status: Status;

  @Column()
  description: string;

  @Column()
  amenities: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => Roomclean, (roomclean) => roomclean.room)
  roomclean: Roomclean[];

  @OneToMany(() => RoomInventory, (roomInventory) => roomInventory.room)
  roomInventory: RoomInventory[];

  @OneToMany(() => Booking, (booking) => booking.room)
  booking: Booking[];
}
