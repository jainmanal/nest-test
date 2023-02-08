import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id : Number

    @Column({ unique: true})
    username : string

    @Column()
    email : string

    @Column()
    password : string

}