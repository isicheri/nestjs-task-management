import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt'
import { TaskEntity } from "src/tasks/entity/task.entity";

@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany( () => TaskEntity, (task) => task.user)
    tasks: TaskEntity[]


    async validatePassword(password: string): Promise<boolean>{
        const hash = await bcrypt.hash(password,this.salt);
        // console.log(hash === this.password);
      return hash === this.password
    }
}