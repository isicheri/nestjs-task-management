import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { tasksStatus } from "../enum/task-status.enum";

export class GetTasksFilterDto {

    @IsOptional()
    @IsIn([tasksStatus.OPEN,tasksStatus.IN_PROGRESS,tasksStatus.DONE])
    status: tasksStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}