import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { tasksStatus } from "../enum/task-status.enum";
import { User } from "src/auth/entity/user.entity";


@Entity({name: 'tasks'})
export class TaskEntity extends BaseEntity {

@PrimaryGeneratedColumn()
id:number;

@Column()
title: string;

@Column()
description: string;

@Column({default: "OPEN"})
status:tasksStatus

@ManyToOne( () => User, (user) => user.tasks, {eager: false} )
user: User

@Column()
userId: number

}