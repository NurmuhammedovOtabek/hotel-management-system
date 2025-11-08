import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Country {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

   @CreateDateColumn()
    createAt:Date
  
    @UpdateDateColumn()
    updateAt:Date

  @OneToMany(() => User, (user) => user.country)
  users: User[];
}
