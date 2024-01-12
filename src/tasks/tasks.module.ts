import { Module } from '@nestjs/common';
import { TaskController } from './controller/task.controller';
import { TasksService } from './service/tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './entity/task.entity';
import { AuthModule } from 'src/auth/auth.module';
import { User } from 'src/auth/entity/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([TaskEntity,User]),AuthModule ],
  controllers: [TaskController],
  providers: [TasksService]
})
export class TasksModule {}
