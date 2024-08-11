import { Input } from "@/components/ui/input"
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { searchUserSchema } from "@/utils/zod"
import { z } from "zod"
import ChatList from "./ChatList"
import { motion } from "framer-motion"
import { useChatStore } from "@/lib/zustand/useChatStore"

const MessageLists = () => {
    const isChatOpenOnMobile = useChatStore(states => states.isChatOpenOnMobile)

    const {
        handleSubmit,
        register,
        formState: { errors: queryError }
    } = useForm<z.infer<typeof searchUserSchema>>({
        resolver: zodResolver(searchUserSchema)
    })

    function onQuerySearch(value: FieldValues) {
        console.log(value)
    }

    return (
        <section className={`w-full ${isChatOpenOnMobile && "hidden lg:grid"} md:w-[30%] grid h-dvh gap-4`}>
            <div className="text-4xl flex gap-2 items-center">
                Messages <p className="text-emerald-500">(0)</p>
            </div>
            <form onSubmit={handleSubmit(onQuerySearch)} className={`flex gap-1 border rounded-lg items-center transition-all duration-500 ${queryError.query ? "border-red-500 bg-red-100 placeholder:text-red-500 focus:border-red-500" : "border-gray-100 bg-gray-100 "} `}>
                <div>
                    <Input
                        {...register("query")}
                        placeholder="Search chats..."
                        className=" border-none bg-transparent w-[280px] md:w-[340px]"
                    />
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 text-gray-500">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </form>
            {queryError.query && <motion.span
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: { duration: 1 }
                }}
                className="text-red-500 text-[10px]">
                {queryError.query.message}
            </motion.span>}

            <ChatList />
        </section >
    )
}

export default MessageLists