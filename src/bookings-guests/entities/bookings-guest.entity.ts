import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Booking } from "../../bookings/entities/booking.entity";

@Entity()
export class BookingsGuest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.bookingguest)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column()
  userId: number;

  @ManyToOne(() => Booking, (booking) => booking.bookingguest)
  @JoinColumn({ name: "bookingId" })
  booking: Booking;

  @Column()
  bookingId: number;

  @Column({default: false})
  isPrmary:boolean
}
