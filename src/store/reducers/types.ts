import {TaskData} from "../../types/Types";

export interface Task extends TaskData {
    id: number;
}

export interface TaskState {
    tasks: Task[];
}
