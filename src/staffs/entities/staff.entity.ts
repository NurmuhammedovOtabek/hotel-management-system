import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "../../roles/entities/role.entity";

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

  @Column({default: new Date()})
  last_login: Date;

  @Column({ default: "0" })
  token: string;

  @Column()
  activation_link: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToMany(() => Role, (role) => role.staffs)
  @JoinTable() // ❗ Bu faqat bitta tomonda bo‘lishi kerak (owner tomonda)
  roles: Role[];
}
