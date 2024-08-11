import { useEffect } from "react"
import { fetchConnectedUsers } from "@/firebase/backend"
import { useAuthContext } from "@/context/Auth"
import { User } from "@/types/backend"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetClose
} from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useChatStore } from "@/lib/zustand/useChatStore"
import { useUserStore } from "@/lib/zustand/useUserStore"
// {
//     chats.map((chat, idx) => (
//         <section key={idx} className="flex gap-2 mt-3 items-center p-1 hover:bg-gray-100 duration-200 transition-all rounded-md cursor-pointer">
//             <img
//                 className="w-14 h-14 rounded-full"
//                 src={chat.avatar || "/view-3d-confident-businessman.jpg"}
//                 alt="Avatar"
//             />
//             <div className="flex-1">
//                 <p className="text-lg">{chat.username}</p>
//                 <p className="text-gray-400 text-[11px]">{chat.lastMessage}</p>
//             </div>
//             <div className="flex flex-col justify-between gap-3">
//                 <p>{chat.date}</p>
//                 <span className="bg-emerald-500 p-1 h-2 w-2 self-end rounded-full">{""}</span> {/* if not seen */}
//             </div>
//         </section>
//     ))
// }

export default function ChatList() {
    const { authenticatedUser } = useAuthContext()
    const connectedUsers = useUserStore(states => states.connectedUsers)
    const setConnectedUsers = useUserStore(states => states.setConnectedUsers)
    const showChatSetterFunc = useChatStore(states => states.setIsChatOpen)
    const selectedUserForChats = useChatStore(states => states.selectUserChat)
    const openChatOnMobile = useChatStore(({ openChatOnMobile }) => openChatOnMobile)

    function onChatClickEvent(user: User) {
        showChatSetterFunc(true)
        selectedUserForChats(user)
        openChatOnMobile()
    }

    useEffect(() => {
        fetchConnectedUsers(authenticatedUser?.uid as string, setConnectedUsers)
    }, [])

    return (
        <section className="relative overflow-y-scroll px-2 w-auto h-[90dvh]">
            <div>No Messages yet</div>
            <Sheet>
                <SheetTrigger>
                    <Button className="absolute bottom-20 right-5 hover:scale-110 active:scale-90 transition-all drop-shadow-2xl rounded-full h-fit w-fit p-2 bg-slate-200 text-black hover:text-emerald-500 hover:bg-slate-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4.5v15m7.5-7.5h-15"
                            />
                        </svg>
                    </Button>
                </SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle className="flex gap-2">Who's Online? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z" />
                        </svg>
                        </SheetTitle>
                        <SheetDescription>
                            Connect with friends, join conversations, and expand your network. See who's online now!
                        </SheetDescription>
                    </SheetHeader>
                    <section className="flex flex-col divide-y p-2">
                        {connectedUsers.map(user => (
                            <div className="flex justify-between items-center" key={user.id}>
                                <fieldset className="flex gap-3 items-center my-2">
                                    <Avatar>
                                        <AvatarImage src={user?.profilePicture as any} />
                                        <AvatarFallback>{user?.firstName.charAt(0).toUpperCase()} {user?.lastName.charAt(0).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                    <p>{user.firstName} {user.lastName}</p>
                                </fieldset>
                                <SheetClose>
                                    <Button className="bg-slate-200 text-black hover:text-emerald-500 hover:bg-transparent hover:scale-110 transition-all" onClick={() => onChatClickEvent(user)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                                        </svg>
                                    </Button>
                                </SheetClose>
                            </div>

                        ))}
                    </section>
                </SheetContent>
            </Sheet>
        </section>
    )
}