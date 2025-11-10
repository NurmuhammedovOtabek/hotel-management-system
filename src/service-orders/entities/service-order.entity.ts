import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../service/entities/service.entity";
import { Booking } from "../../bookings/entities/booking.entity";

export enum ServiceStatus {
  pending = "pending",
  in_progress = "in_progress",
  completed = "completed",
  cancelled = "cancelled",
}

@Entity()
export class ServiceOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Service, (service) => service.serviceorder)
  @JoinColumn({ name: "serviceId" })
  service: Service;

  @Column()
  serviceId: number;

  @ManyToOne(() => Booking, (booking) => booking.serviceorder)
  @JoinColumn({ name: "bookingId" })
  booking: Booking;

  @Column()
  bookingId: number;

  @Column({default: 1})
  quantity: number

  @Column()
  totalPrice:number

  @Column({default: ServiceStatus.pending})
  status:ServiceStatus
}
