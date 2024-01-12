import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { tasksStatus } from '../enum/task-status.enum';
import { CreateTaskDto } from '../dto/create-task.dto';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { TaskStatusValidationPipes } from '../pipes/task-status-validation.pipes';
import { TaskEntity } from '../entity/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';


@Controller('task')
@UseGuards(AuthGuard())
export class TaskController {
    private logger = new Logger('TaskController') 
    constructor(private taskService: TasksService) {}

    @Get()
    getTasks(@Query(ValidationPipe)filterDto: GetTasksFilterDto,
    @GetUser() user: User
    ) {
        this.logger.verbose(`User ${user.username} retrieving all task Filters: ${JSON.stringify(filterDto)}`)
        return this.taskService.getTask(filterDto,user)
    }

    @Get('/:id')
    getTaskById(
        @GetUser() user: User,
        @Param('id',ParseIntPipe) id: number): Promise<TaskEntity>{
        return this.taskService.getTaskById(id,user)
    }


    @Post() 
    @UsePipes(ValidationPipe)
    createTask(@Body() createTaskDto: CreateTaskDto, @GetUser() user:User) : Promise<TaskEntity> {    
       return  this.taskService.createTask(createTaskDto,user)
    }

    @Delete('/:id')
    deleteTaskById(@Param('id',ParseIntPipe) id: number,@GetUser() user: User) {
        this.taskService.deleteTask(id,user)
    }


    @Patch('/:id/status')
    updateTaskStatus(@Param('id',ParseIntPipe) id: number,@Body('status',TaskStatusValidationPipes) status: tasksStatus, @GetUser() user: User): 
    Promise<TaskEntity> {
        return this.taskService.updateTaskStatus(id,status,user)
    }

}