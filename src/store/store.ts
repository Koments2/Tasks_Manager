import { configureStore } from '@reduxjs/toolkit';
import TasksReducer from "./reducers/TasksReducer"

const store = configureStore({
    reducer: {
        tasks: TasksReducer
    },
});

export default store;