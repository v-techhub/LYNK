import { createBrowserRouter } from "react-router-dom"
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./paths"
import LoginRegisterTab from "@/screens/auth"
import ChatBoard from "@/screens/private/ChatBoard"

export const routes = createBrowserRouter([
    {
        path: PUBLIC_PATHS.AUTH,
        element: <LoginRegisterTab />
    },
    {
        path: PRIVATE_PATHS.CHATS_BOARD,
        element: <ChatBoard />
    }
])
