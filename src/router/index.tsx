import { createBrowserRouter } from 'react-router-dom';
import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import ErrorPage from "../components/ErrorPage";
import App from "../App";
import EditTask from "../components/EditTask";
import TaskInfo from "../components/TaskInfo";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'tasks',
                element: <TaskList />,
            },
            {
                path: 'add-task',
                element: <AddTask />,
            },
            {
                path: 'edit-task/:id',
                element: <EditTask />,
            },{
                path: 'task-info/:id',
                element: <TaskInfo />,
            },
            {
                path: '*',
                element: <ErrorPage />,
            },
        ],
    },
]);
