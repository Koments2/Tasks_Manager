import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from './types';
import {tasks} from "./Tasks";
import {TaskData} from "../../types/Types";

const initialState = {
    tasks: Array.isArray(tasks) ? tasks : [],
};

const tasksSlice = createSlice({
    name: 'TasksReducer',
    initialState,
    reducers: {
        // Delete a task by its id
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        // Add a new task to the state
        addTask: (state, action: PayloadAction<TaskData>) => {
            const lastTask = state.tasks[state.tasks.length - 1]; // Get the last task
            const newId = lastTask ? lastTask.id + 1 : 1; // Generate new ID by incrementing the last task's ID or use 1 if no tasks exist

            const newTask: Task = {
                id: newId, // Set the new ID
                ...action.payload, // Spread the task data from the action payload
            };
            console.log(newTask)
            state.tasks.push(newTask); // Add the new task to the tasks array
        }
        ,
        editTask: (state, action: PayloadAction<Task>) => {
            const updatedTask = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === updatedTask.id);
            if (taskIndex !== -1) {
                state.tasks[taskIndex] = updatedTask;
            }
        }
    },
});

export const { deleteTask, addTask, editTask } = tasksSlice.actions;
export default tasksSlice.reducer;
