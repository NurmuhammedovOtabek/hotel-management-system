import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Room } from "../../rooms/entities/room.entity";
import { User } from "../../users/entities/user.entity";
import { BookingsGuest } from "../../bookings-guests/entities/bookings-guest.entity";
import { ServiceOrder } from "../../service-orders/entities/service-order.entity";
import { Payment } from "../../payments/entities/payment.entity";
import { Review } from "../../reviews/entities/review.entity";

export enum BStatus {
  pending = "pending",
  confirmed = "confirmed",
  cancelled = "cancelled",
  completed = "completed",
}

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Room, (room) => room.booking)
  @JoinColumn({ name: "roomId" })
  room: Room;

  @Column()
  roomId: number;

  @ManyToOne(() => User, (user) => user.booking)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  guestsCount: number;

  @Column({ default: BStatus.pending })
  status: BStatus;

  @Column({ default: 0 })
  totlaAmount: number;

  @Column({ default: 0 })
  debt: number;

  @OneToMany(() => BookingsGuest, (bookingguest) => bookingguest.booking)
  bookingguest: Booking[];

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.booking)
  serviceorder: ServiceOrder[];

  @OneToMany(() => Payment, (payment) => payment.booking)
  payments: Payment[];

  @OneToMany(() => Review, (review) => review.booking)
  reviews: Review[];
}
