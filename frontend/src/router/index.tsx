import { createBrowserRouter } from "react-router-dom";
import Login from "@/pages/public/Login";
import NotFound from "@/pages/public/NotFound";
import Register from "@/pages/public/Register";
import { Routes } from "@/constants/routes";
import RouteProtection from "@/components/RouteProtection";
import Home from "@/pages/private/Home";
import Board from "@/pages/private/Board";

const router = createBrowserRouter([
    {
        path: Routes.NOT_FOUND,
        element: <NotFound/>
    },
    {
        path: Routes.LOGIN,
        element: <Login/> 
    },
    {
        path: Routes.REGISTER,
        element: <Register/> 
    },
    {
        path: "/",
        element: <RouteProtection/>,
        children: [
            {
                path: Routes.HOME,
                element: <Home/>
            },
            {
                path: Routes.BOARD,
                element: <Board/>,
                children: [
                    {
                        path: Routes.BOARD_CARD,
                    }
                ]
            }
        ]
    }
])

export default router