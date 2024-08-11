import { useUserStore } from "@/lib/zustand/useUserStore"
import { useGetCurrentUser } from "@/hooks/useGetCurrentUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { initialsOfName } from "@/utils/initialsOfName"

const ProfileInfo = ({ collapsible }: { collapsible: boolean }) => {
    const userData = useUserStore(state => state.userData)
    useGetCurrentUser()
    return (
        <section className="flex items-center gap-3 text-gray-500">
            <Avatar>
                <AvatarImage src={userData?.profilePicture as any} />
                <AvatarFallback>{initialsOfName(userData?.firstName as string, userData?.lastName as string)}</AvatarFallback>
            </Avatar>

            <p className={` ${collapsible ? "hidden" : ""}`}>Hi 🖐️, {userData?.username}</p>
        </section>
    )
}

export default ProfileInfo