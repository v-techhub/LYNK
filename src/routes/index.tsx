import { createBrowserRouter } from "react-router-dom"
import { PUBLIC_PATHS, PRIVATE_PATHS } from "./paths"
import LoginRegisterTab from "@/screens/auth"
import ChatBoard from "@/screens/private/ChatBoard"
import RootLayout from "@/layout/Rootlayout"
import ProtectedRoutes from "@/layout/ProtectedRoutes"
import Chats from "@/screens/private/chats"
import Explore from "@/screens/private/explore"
import FavouriteChats from "@/screens/private/favourite-chats"
import Notifications from "@/screens/private/notifications"
import Settings from "@/screens/private/settings"

export const routes = createBrowserRouter([
    {
        path: PUBLIC_PATHS.AUTH,
        element: <LoginRegisterTab />
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: PRIVATE_PATHS.CHATS_BOARD,
                element: <ProtectedRoutes children={<ChatBoard />} />
            },
            {
                path: PRIVATE_PATHS.CHATS,
                element: <ProtectedRoutes children={<Chats />} />
            },
            {
                path: PRIVATE_PATHS.EXPLORE,
                element: <ProtectedRoutes children={<Explore />} />
            },
            {
                path: PRIVATE_PATHS.FAVOURITE_CHATS,
                element: <ProtectedRoutes children={<FavouriteChats />} />
            },
            {
                path: PRIVATE_PATHS.NOTIFICATIONS,
                element: <ProtectedRoutes children={<Notifications />} />
            },
            {
                path: PRIVATE_PATHS.SETTINGS,
                element: <ProtectedRoutes children={<Settings />} />
            },
        ]
    }
])
