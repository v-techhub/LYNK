import ChatLists from "./ChatLists"
import ChatBox from "./ChatBox"

const Chats = () => {
    return (
        <main className="flex w-full gap-5 p-3">
            <ChatLists />
            <ChatBox />
        </main>
    )
}

export default Chats