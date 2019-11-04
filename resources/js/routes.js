import Login from "./Pages/Login";
import Home from "./Pages/Home";
import TaskCreate from "./Pages/TaskCreate";
import TaskEdit from "./Pages/TaskEdit";
export const routes = [
    {
        path: '/',
        name: 'login',
        component: Login,
    },
    {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
            auth: true
        }
    },
    {
        path: '/task/create',
        name: 'taskCreate',
        component: TaskCreate,
        meta: {
            auth: true
        }
    },
    {
        path: '/task/edit/:id',
        name: 'taskEdit',
        component: TaskEdit,
        meta: {
            auth: true
        }
    },
    {
        path: '*',
        name: 'catch',
        component: Login
    }
];
