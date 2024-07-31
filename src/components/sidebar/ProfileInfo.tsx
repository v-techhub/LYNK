import { useAuthContext } from "@/context/Auth"

const ProfileInfo = ({ collapsible }: { collapsible: boolean }) => {
    const { authenticatedUser } = useAuthContext()
    return (
        <section className="flex items-center gap-3 text-gray-500">
            <img
                className="rounded-full w-12 h-12 object-contain"
                src="/male.jpg"
                alt="Profile Image"
            />
            <p className={` ${collapsible ? "hidden" : ""}`}>Hi 🖐️, {authenticatedUser?.displayName}</p>
        </section>
    )
}

export default ProfileInfo