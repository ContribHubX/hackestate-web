import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "@/app/pages/home";
import { useMemo } from "react";


const createAppRouter = () => 
    createBrowserRouter([
        {
            path: "/",
            // lazy: async () => {
            //     const Home = await import("@/pages/home");
            //     return { Component: Home }
            // }
            element: <Home />
        }
    ])

    
export const AppRouter = () => {
    const router = useMemo(() => createAppRouter(), []);

    return <RouterProvider  router={router}/>
}