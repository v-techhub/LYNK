import MessageLists from "./MessageLists"
import ChatBox from "./ChatBox"

const Chats = () => {
    return (
        <main className="flex h-screen w-full gap-5 p-3">
            <MessageLists />
            <ChatBox />
        </main>
    )
}

export default Chats