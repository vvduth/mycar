import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, AfterUpdate, AfterRemove, 
    OneToMany } from "typeorm";
import { Report } from "src/reports/reports.entity";

@Entity()
export class User {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column({default: true})
    admin: boolean;

    @Column()
    password: string;

    @OneToMany(() => Report,(report)=> report.user)
    reports: Report[];

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