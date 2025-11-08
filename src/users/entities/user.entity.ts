import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  ForeignKey,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Country } from "../../country/entities/country.entity";
const { v4: uuidv4 } = require("uuid");

// const uuid = require("uuid");
// import { v4 as uuidv4 } from "uuid";
export enum Gender {
  male = "male",
  female = "female",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  fullName: string;

  @Column({ nullable: false })
  age: number;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ unique: true, nullable: false })
  passport: string;

  @Column()
  gender: Gender;

  @Column({ default: "user" })
  role: string;

  @Column({ default: false })
  is_active: boolean;

  @Column({default:"0"})
  token: string;

  @ManyToOne(() => Country, (country) => country.users)
  @JoinColumn({ name: "countryId" })
  country: Country;

  @Column()
  countryId: number;

  @Column()
  activation_link: string;

 @CreateDateColumn()
  createAt:Date

  @UpdateDateColumn()
  updateAt:Date  
}
