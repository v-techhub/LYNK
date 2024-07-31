const chats = [
    {
        lastMessage: "Hey, what's up...",
        avatar: "",
        date: "11:30",
        username: "John Doe"
    },
    {
        lastMessage: "Have you secured the place?",
        avatar: "",
        date: "14:11",
        username: "Jessica Hunters",
    },
]

export default function ChatList() {
    return (
        <section className="overflow-y-scroll px-2 w-auto h-[90dvh]">
            {chats.map((chat, idx) => (
                <section key={idx} className="flex gap-2 mt-3 items-center p-1 hover:bg-gray-100 duration-200 transition-all rounded-md cursor-pointer">
                    <img
                        className="w-14 h-14 rounded-full"
                        src={chat.avatar || "/view-3d-confident-businessman.jpg"}
                        alt="Avatar"
                    />
                    <div className="flex-1">
                        <p className="text-lg">{chat.username}</p>
                        <p className="text-gray-400 text-[11px]">{chat.lastMessage}</p>
                    </div>
                    <div className="flex flex-col justify-between gap-3">
                        <p>{chat.date}</p>
                        <span className="bg-emerald-500 p-1 h-2 w-2 self-end rounded-full">{""}</span> {/* if not seen */}
                    </div>
                </section>
            ))}
        </section>
    )
}