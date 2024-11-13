import {Task} from "../components/TaskList/Types";

export type TasksType = {
    tasks:{
        tasks: Task[]
    }
}

export interface TaskData {
    title: string;
    description: string;
    status: string;
    createdAt: string;
    image: any;
}

export type Options = {  id: number, name: string, value: string }