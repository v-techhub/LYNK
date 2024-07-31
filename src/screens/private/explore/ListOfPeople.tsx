import React from "react"
import { Button } from "@/components/ui/button"
import {
    DrawerClose,
    DrawerContent,
    DrawerFooter,
} from "@/components/ui/drawer"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getAllUsers } from "@/firebase/backend"
import { useAuthContext } from "@/context/Auth"
import { User as UserType } from "@/types/backend"

export default function ListOfPeople() {
    const { authenticatedUser } = useAuthContext()
    const [users, setUsers] = React.useState<UserType[]>([])

    React.useEffect(() => {
        getAllUsers(authenticatedUser?.uid as string, setUsers)
    }, [])

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
                                className='flex flex-col justify-center gap-2 bg-black/70 p-3 h-full z-[9999] translate-y-[100%] group-hover:translate-y-0 transition-all duration-500'>
                                <Button className="bg-slate-50 text-emerald-500">
                                    See Profile
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                                    </svg>
                                </Button>

                                <Button className="bg-emerald-500">
                                    Connect
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                                    </svg>

                                </Button>
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