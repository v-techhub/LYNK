import { ReactNode } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteConnectedUser, connectNewUser } from "@/firebase/backend"
import { User } from "@/types/backend"
import { useAuthContext } from "@/context/Auth"
import { toast } from "sonner"

interface ProfileDialogPropTypes {
    element: ReactNode
    user: User
    setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteDialog({ element, user, setIsConnecting }: ProfileDialogPropTypes) {
    const { authenticatedUser } = useAuthContext()
    const handleDisconnection = () => {
        deleteConnectedUser(authenticatedUser?.uid as string, user.id)
        toast("Disconnection successful!", {
            description: `You have successfully removed ${user.firstName} ${user.lastName} from your connections.`,
            action: {
                label: "UNDO",
                onClick: () => {
                    connectNewUser(user, authenticatedUser?.uid as string, setIsConnecting)
                }
            },
        })
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                {element}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex gap-3 items-center">
                        Confirm disconnection <img src={user.profilePicture as any} className="w-12 h-12 rounded-full object-cover" alt="" />
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="">
                    Removing <strong>{user.firstName} {user.lastName} </strong> will delete your conversation history and connections. Proceed with caution.
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={handleDisconnection} variant="destructive">Disconnect</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}