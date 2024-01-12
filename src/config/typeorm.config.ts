import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/auth/entity/user.entity";
import { TaskEntity } from "src/tasks/entity/task.entity";
import * as config from 'config';


const dbConfig: {type: any,host: any,username: any, password: any, port: any, synchronize: any } = config.get('db');

export const typeOrmConfig:TypeOrmModuleOptions = {
    type: dbConfig.type,
    host: process.env.RBD_HOSTNAME || dbConfig.host,
    port: process.env.RBD_PORT || dbConfig.port,
    username: process.env.RBD_USERNAME ||  dbConfig.username,
    password: process.env.RBD_PASSWORD ||  dbConfig.password,
    database: 'taskmanagement',
    entities:[TaskEntity,User],
    synchronize: process.env.TYPEORM_SYNC || dbConfig.synchronize,
    // logging: true
}

// {
//     type: 'postgres',
//     host: 'localhost',
//     port: 5432,
//     username: 'postgres',
//     password: 'dominion',
//     database: 'taskmanagement',
//     entities:[],
//     synchronize: true
//   }