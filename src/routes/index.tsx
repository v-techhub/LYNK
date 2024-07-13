import { createBrowserRouter } from "react-router-dom"
import { PUBLIC_PATHS } from "./paths"
import LoginRegisterTab from "@/screens/auth"

export const routes = createBrowserRouter([
    {
        path: PUBLIC_PATHS.AUTH,
        element: <LoginRegisterTab />
    },

])
