import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ServiceOrder } from "../../service-orders/entities/service-order.entity";

@Entity()
export class Service {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column()
  description: string;

  @Column({ nullable: false })
  price: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @OneToMany(() => ServiceOrder, (serviceOrder) => serviceOrder.service)
  serviceorder: ServiceOrder[];
}
