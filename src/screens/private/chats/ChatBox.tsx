import DotPattern from "@/components/magicui/dot-pattern"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatBox() {
    return (
        <section className="w-[70%] flex flex-col">
            <header className="flex justify-between items-center mb-5">
                <div className="flex gap-2 items-center">
                    <img
                        className="w-12 h-12 rounded-full"
                        src="/view-3d-confident-businessman.jpg"
                        alt="Avatar"
                    />
                    <div>
                        <p className="text-lg">John Doe</p>
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

            <section className="relative flex-1">
                <DotPattern className="rounded-md absolute h-[700px] opacity-80" /> {/* background element*/}
                <div className="flex-1">
                    <ul>
                        <li className="flex gap-2 items-center">
                            <img src="/view-3d-confident-businessman.jpg" className="w-12 h-12 rounded-full" alt="" />
                            Hey, what's up...
                        </li>
                    </ul>

                </div>
            </section>

            <fieldset className="bg-gray-400/20 p-2 flex gap-2 mb-5 rounded-lg backdrop-blur-sm">
                <Input placeholder="Write message..." className="border-none bg-transparent" />
                <Button>
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
            </fieldset>

        </section>
    )
}