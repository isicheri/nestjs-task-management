import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { TaskEntity } from './tasks/entity/task.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig),TasksModule, AuthModule,TypeOrmModule.forFeature([User,TaskEntity])],
  controllers: [],
  providers: [],
})
export class AppModule {}
