import { Input } from "@/components/ui/input"
import { useForm, FieldValues } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { searchUserSchema } from "@/utils/zod"
import { z } from "zod"
import ChatList from "./ChatList"
import { motion } from "framer-motion"

const ChatLists = () => {
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
        <section className="w-full md:w-[30%] h-dvh grid gap-4">
            <div className="text-4xl flex gap-2 items-center">
                Messages <p className="text-emerald-500">(16)</p>
            </div>
            <form onSubmit={handleSubmit(onQuerySearch)}>
                <Input
                    {...register("query")}
                    className={`${queryError.query ? "border-red-500 bg-red-100 placeholder:text-red-500 focus:border-red-500" : "border-gray-100 bg-gray-100 focus:border-emerald-500"} transition-all duration-500 `}
                    placeholder="Search chats..."
                />
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
            </form>
            <ChatList />
        </section>
    )
}

export default ChatLists