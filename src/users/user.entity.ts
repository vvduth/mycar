import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove } from "typeorm";


@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log(`Insert user with id ${this.id}`)
    }

    @AfterUpdate()
    logUpdate() {
        console.log(`Insert user with id ${this.id}`)
    }
    @AfterRemove()
    logRemove() {
        console.log(`Insert user with id ${this.id}`)
    }
}