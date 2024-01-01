import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../../Layout/Main";
import Home from "../../Pages/Home/Home/Home";
import Menu from "../../Pages/Menu/Menu/Menu";
import Order from "../../Pages/Order/Order/Order";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Dashboard from "../../Layout/dashboard";
import MyCart from "../../Pages/Dashboard/MyCart/MyCart";
import AllUsers from "../../Pages/Dashboard/AllUsers/AllUsers";
import AddItem from "../../Pages/Dashboard/AddItem/AddItem";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'menu',
                element: <Menu />
            },
            {
                path: 'order/:category',
                element: <Order />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'allusers',
                element: <AllUsers />
            },
            {
                path: 'additem',
                element: <AddItem />
            },
            {
                path: 'mycart',
                element: <MyCart />
            }
        ]
    }
]);