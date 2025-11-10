
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Booking } from "../../bookings/entities/booking.entity";

export enum PaymentMethod {
  cash = "cash",
  card = "card",
  online = "online",
}

export enum PaymentStatus {
  pending = "pending",
  completed = "completed",
  failed = "failed",
  refunded = "refunded",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.payments)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Booking, (booking) => booking.payments)
  @JoinColumn({ name: "bookingId" })
  booking: Booking;

  @Column()
  bookingId: number;

  @Column("decimal", { precision: 10, scale: 2 })
  amount: number;

  @Column({
    type: "enum",
    enum: PaymentMethod,
    default: PaymentMethod.cash,
  })
  payment_method: PaymentMethod;

  @Column({
    type: "enum",
    enum: PaymentStatus,
    default: PaymentStatus.pending,
  })
  payment_status: PaymentStatus;

  @Column({ type: "date", nullable: true, default: new Date() })
  payment_date: Date;
}
