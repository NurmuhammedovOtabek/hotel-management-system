import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "../../roles/entities/role.entity";
import { Roomclean } from "../../roomclean/entities/roomclean.entity";

@Entity()
export class Staff {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({ default: "0" })
  token: string;

  @Column()
  activation_link: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Role, (role) => role.staffs)
  @JoinTable() 
  roles: Role[];

  @OneToMany(() => Roomclean, (roomclean) => roomclean.staff)
  roomclean: Roomclean[];
}
