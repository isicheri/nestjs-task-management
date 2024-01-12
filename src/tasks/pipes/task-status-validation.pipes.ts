import { BadRequestException, PipeTransform } from "@nestjs/common";
import { tasksStatus } from "../enum/task-status.enum";

export class TaskStatusValidationPipes implements PipeTransform {

    readonly allowedStatus = [
        tasksStatus.OPEN,
        tasksStatus.IN_PROGRESS,
        tasksStatus.DONE
        ]

    transform(value: any) {
         value = value.toUpperCase()
         if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
         }
        return value
    }
    private isStatusValid(status: any) {
  const idx =  this.allowedStatus.indexOf(status)  
    return idx !== -1
    }
}