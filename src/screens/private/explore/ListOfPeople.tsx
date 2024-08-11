import React from "react"
import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllUsers, connectNewUser, checkConnection, fetchConnectedUsers } from "@/firebase/backend"
import { useAuthContext } from "@/context/Auth"
import { User as UserType } from "@/types/backend"
import ProfileDialog from "./profileDialog"
import DeleteDialog from "./deleteDialog"
import { useNavigate } from "react-router-dom"
import { Loader2 } from "lucide-react"
import { toast as sonnerToast } from "sonner"
import { PRIVATE_PATHS } from "@/routes/paths"
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser"
import { useUserStore } from "@/lib/zustand/useUserStore"

export default function ListOfPeople() {
    const { authenticatedUser } = useAuthContext()
    const [users, setUsers] = React.useState<UserType[]>([])
    const [isConnecting, setIsConnecting] = React.useState(false)
    const [isAlreadyConnected, setIsAlreadyConnected] = React.useState(false)
    const navigate = useNavigate()
    const { data } = useGetCurrentUser()
    const setConnectedUsers = useUserStore(state => state.setConnectedUsers)
    const connectedUsers = useUserStore(state => state.connectedUsers)

    React.useEffect(() => {
        fetchConnectedUsers(authenticatedUser?.uid as string, setConnectedUsers)
        getAllUsers(authenticatedUser?.uid as string, setUsers)
    }, [isConnecting])

    const connectedUsersId = connectedUsers.map(user => user.id)

    const connect = (user: UserType) => {
        const isConnected = checkConnection(authenticatedUser?.uid as string, user)

        setIsAlreadyConnected(isConnected as any)

        if (isAlreadyConnected) {
            sonnerToast("Oops!", {
                description: `You had been connected to ${user.username} before.`,
                action: {
                    label: `chat with ${user.firstName} ${user.lastName}`,
                    onClick: () => {
                        setTimeout(() => navigate(PRIVATE_PATHS.CHATS, { replace: true }), 2 * 1000)
                        console.log(`is Chatting with ${user.username}`)
                    },
                },
            })
            return
        }

        connectNewUser(user, authenticatedUser?.uid as string, setIsConnecting, data as UserType)

        sonnerToast("Connection confirmed!", {
            description: `You can now collaborate, communicate, or simply get to know ${user.username}.`,
            // action: {
            //     label: `chat with ${user.firstName} ${user.lastName}`,
            //     onClick: () => {
            //         setTimeout(() => navigate(PRIVATE_PATHS.CHATS, { replace: true }), 2 * 1000)
            //         console.log(`is Chatting with ${user.username}`)
            //     },
            // },
        })
    }

    return (
        <DrawerContent>
            <ScrollArea className="h-[400px]">
                <div
                    className="p-3 flex flex-wrap gap-3 justify-center">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className={`group overflow-hidden relative rounded-lg cursor-pointer h-[300px] w-[250px]`}>
                            <img src={user.profilePicture as any} alt="IMG" className="w-full h-full object-cover absolute" />
                            <section className="absolute bottom-0 left-0 p-2 w-full bg-black/40 text-white">
                                <div className="flex gap-1 items-end text-xl">{user.firstName} {user.lastName} <div className="h-2 w-2 bg-emerald-500 mb-2"></div></div>
                                <p className="text-[11px] text-gray-300 text-left">{user.firstOccupation} | {user.secondOccupation}</p>
                            </section>
                            <fieldset
                                className='hidden group-hover:flex flex-col justify-center gap-2 bg-black/70 backdrop-blur-md p-3 h-full z-[9999] translate-y-[100%] group-hover:translate-y-0 transition-all duration-500'>
                                <ProfileDialog element={<Button className="bg-slate-50 text-emerald-500 w-full">
                                    See Profile
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </Button>}
                                    user={user}
                                />
                                {connectedUsersId.includes(user.id)
                                    ? <DeleteDialog
                                        setIsConnecting={setIsConnecting}
                                        user={user}
                                        element={<Button variant="destructive">disconnect</Button>}
                                    />
                                    : <Button className="bg-emerald-500" disabled={isConnecting} onClick={() => connect(user)}>
                                        {isConnecting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> connecting...</> : "connect"}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                        </svg>
                                    </Button>}
                            </fieldset>
                        </div>
                    ))}
                </div>
            </ScrollArea>
            <DrawerFooter>
                <DrawerClose asChild>
                    <Button variant="outline" className="w-fit m-auto">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent >
    )
}