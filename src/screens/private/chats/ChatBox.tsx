import React, { useState, useEffect, useRef } from "react"
import DotPattern from "@/components/magicui/dot-pattern"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LynkAnimatedBeamMultiple } from "../LynkAnimatedBeamMultiple"
import WordPullUp from "@/components/magicui/word-pullup";
import { useChatStore } from "@/lib/zustand/useChatStore"
import { User, Chat } from "@/types/backend"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuthContext } from "@/context/Auth"
import { sendMessage, getChat } from "@/firebase/backend"
import { capitalizeFirstLetter } from "@/utils/captitalizeFirstLetter"
import { initialsOfName } from "@/utils/initialsOfName"
import { format } from 'date-fns'

export default function ChatBox() {
    const { authenticatedUser } = useAuthContext()
    const isChatOpen = useChatStore(state => state.isChatOpen)
    const selectedUserForChats = useChatStore(state => state.selectedUser)
    const isChatOpenOnMobile = useChatStore(({ isChatOpenOnMobile }) => isChatOpenOnMobile)
    const closeChatOnMobile = useChatStore(({ closeChatOnMobile }) => closeChatOnMobile)
    const [chats, setChats] = useState<Chat[]>([])
    const end = useRef(null)

    // useEffect(() => {
    //     const endOfChatElement = document.getElementById("endOfChat")
    // }, [])

    useEffect(() => {
        getChat(authenticatedUser?.uid as string, selectedUserForChats?.id as string, setChats)
    }, [selectedUserForChats])

    const sendMessageHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        let { message } = Object.fromEntries(formData)
        if (message === "") return
        sendMessage(authenticatedUser?.uid as string, selectedUserForChats?.id as string, {
            timeSent: Date.now(),
            message: message as string,
            senderId: authenticatedUser?.uid as string,
            isRead: false
        })
        const messageElement = e.currentTarget.elements.namedItem("message") as HTMLInputElement
        messageElement.value = ""
    }

    const ChatBoxUIUX = ({ user }: { user: User }) => (
        isChatOpen
            ? <main className="relative w-[350px] h-dvh md:w-full">
                <header className="flex justify-between items-center mb-5">
                    <div className="flex gap-2 items-center">
                        <Button onClick={closeChatOnMobile} className={`bg-gray-100 ${isChatOpenOnMobile && "lg:hidden"} rounded-full text-black p-2 hover:bg-gray-100 hover:scale-110 transition-all active:scale-90`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                            </svg>
                        </Button>
                        <Avatar>
                            <AvatarImage src={user?.profilePicture as any} />
                            <AvatarFallback>{initialsOfName(user?.firstName, user?.lastName)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-lg">
                                {capitalizeFirstLetter(user?.firstName)} {capitalizeFirstLetter(user?.lastName)}
                            </p>
                            <p className="text-[11px] text-gray-400">online</p>
                        </div>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-gray-200 p-2 rounded-md cursor-pointer hover:text-emerald-500 transition-all duration-200 hover:scale-105 border hover:border-emerald-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                                />
                            </svg>
                        </div>
                        <div className="bg-gray-200 p-2 rounded-md cursor-pointer hover:text-emerald-500 transition-all duration-200 hover:scale-105 border hover:border-emerald-500">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0 6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z"
                                />
                            </svg>
                        </div>

                        <div className="bg-gray-200 p-2 rounded-md cursor-pointer hover:text-emerald-500 transition-all duration-200 hover:scale-105 border hover:border-emerald-500">
                            <svg xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
                                />
                            </svg>
                        </div>
                    </div>
                </header>

                <section className="relative flex-1 h-[78dvh] overflow-y-scroll">
                    <DotPattern className="rounded-md absolute h-[700px] opacity-30" /> {/* background element*/}
                    <div className="flex-1">
                        <ul className="flex flex-col gap-3">
                            {chats.length > 0 && chats?.map(chat => (
                                <li className={`flex flex-col ${chat.senderId === authenticatedUser?.uid && "self-end"}`} key={chat.timeSent}>
                                    <div className={`ml-2  w-fit p-2 rounded-md backdrop-blur-md ${chat.senderId === authenticatedUser?.uid ? "bg-emerald-300 text-gray-700" : "bg-slate-200"}`} key={chat.timeSent}>
                                        {chat.message}
                                        <p className="text-[9px] text-gray-600 self-end">
                                            {format(chat.timeSent, `hh:mm a`)}
                                        </p>
                                    </div>
                                </li>
                            ))}
                            <div className="" id="endOfChat" ref={end}>END OF CHAT</div>
                        </ul>
                    </div>
                </section>

                <form className="bg-gray-400/20 p-2 flex gap-2 mb-5 rounded-lg backdrop-blur-sm absolute w-full bottom-0 shadow-xl" onSubmit={sendMessageHandler}>
                    <Input
                        placeholder="Write message..."
                        className="border-none bg-transparent"
                        name="message"
                        autoComplete="off"
                    />
                    <Button type="submit">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
                        </svg>
                    </Button>
                </form>
            </main>
            : <>
                <LynkAnimatedBeamMultiple />
                <WordPullUp
                    className="font-normal tracking-[-0.02em]"
                    words="connect and maybe create a whole chapter of possibilities 💪."
                />
            </>
    )

    return (
        <section className={`${!isChatOpenOnMobile && "hidden lg:flex"} w-[70%] flex-col`}>
            <ChatBoxUIUX user={selectedUserForChats as User} />
        </section>
    )
}