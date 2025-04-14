import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/app/pages/home";
import { useMemo } from "react";
import Login from "./pages/auth/login";
import AuthRoot from "./pages/auth/root";
import Signup from "./pages/auth/signup";
import AppRoot from "./pages/root";
import Dashboard from "./pages/dashboard/page";
import AiChat from "./pages/ai/ai-chat";
import { Properties } from "./pages/properties/page";
import { Events } from "./pages/events/page";
// import AuthGuard from "@/components/auth/auth-guard";


const createAppRouter = () =>
    createBrowserRouter([
        {
            path: "/auth",
            element: <AuthRoot />,

            children: [
                {
                    index: true,
                    path: "login",
                    element: <Login />
                },
                {
                    path: "signup",
                    element: <Signup />
                },
            ]
        },
        {
            path: "/",
            element: <AppRoot />,

            children: [
                {
                    index: true,
                    element: <Home />
                },
                {
                  path: "/dashboard",
                  index: true,
                  element: <Dashboard />
                },
                {
                    path: "/chat",
                    index: true,
                    element: <AiChat />
                },
                {
                    path:'/properties',
                    element: <Properties />
                },
                {
                    path: '/events',
                    element: <Events />
                }
            ]
        }
    ])


export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);


    return <RouterProvider  router={router}/>
}
