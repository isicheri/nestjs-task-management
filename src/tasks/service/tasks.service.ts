import { Injectable, NotFoundException } from '@nestjs/common';
import { tasksStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from '../entity/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entity/user.entity';


@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskEntity)
        private taskRepository:Repository<TaskEntity>
    ) {}


async getTask(filterDto: GetTasksFilterDto,user: User): Promise<TaskEntity[]> {
const {status,search} = filterDto;
const query = this.taskRepository.createQueryBuilder('task')

query.where('task.userId = :userId', { userId:`${user.id}`})

if(status) {
query.andWhere('task.status= :status', {status})
}

if(search) {
    query.andWhere('(tasks.title LIKE :search OR task.description LIKE :search)',{search: `%${search}%`})
}

const tasks = await query.getMany()
return tasks;
}

   async getTaskById(id:number,user:User):Promise<TaskEntity> {
    const found = await this.taskRepository.findOne({
        where: {
            id: id,
            userId: user.id
        }
    })
    if(!found) {
        throw new NotFoundException(`task with id:${id} not found`)
    }
    return found
    }

   async createTask(createTaskDto:CreateTaskDto,user:User): Promise<TaskEntity> {
    // const task = this.taskRepository.create({ title: createTaskDto.title, description: createTaskDto.description,user: user})
    // task.userId = task.id
    const {title,description} = createTaskDto;
    // const userId = await User.getId(new User());
    
    const task = new TaskEntity()
    task.title = title;
    task.description = description;
    task.status = tasksStatus.OPEN;
    task.user = user;
    // task.userId = userId;
    await task.save()
    delete task.user
     return task
    //  delete task.user;
    }

    async deleteTask(id: number,user:User): Promise<void> {
     const task = await this.taskRepository.delete({id: id,userId: user.id});
     if(task.affected  === 0) {
        throw new NotFoundException(`task with id:${id} not found`)
     }
     }


   async updateTaskStatus(id: number, status: tasksStatus,user: User): Promise<TaskEntity> {
    const task = await this.getTaskById(id,user);
     task.status = status;
      await task.save()
      return task
   }
}
