import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { User } from "@/types/backend"
import { format } from "date-fns"

interface ProfileDialogPropTypes {
    element: ReactNode
    user: User
}

export default function ProfileDialog({ element, user }: ProfileDialogPropTypes) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {element}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-3 items-center">
                        <img src={user.profilePicture as any} className="w-12 h-12 rounded-full object-cover" alt="" />
                        {user.firstName} {user.lastName}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="flex flex-col gap-3 divide-y tracking-wide">
                    <div>Username: {user.username}</div>
                    <div>Lives at {user.stateOrProvince}, {user.country}.</div>
                    <div>Bio: {user.bio}</div>
                    <div>Email: {user.email}</div>
                    <div>Phone: {user.phone}</div>
                    <div>Joined: {format(user.joined, "dd, MMM yyyy")}</div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}