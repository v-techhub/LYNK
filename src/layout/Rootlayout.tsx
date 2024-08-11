import CollapsibleSideNavBar from "@/components/sidebar"
import { Outlet } from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"

const RootLayout = () => {
    return (
        <main className="overflow-y-hidden h-dvh w-auto flex">
            <Toaster />
            <CollapsibleSideNavBar />
            <section className=" w-[100dvw]">
                <Outlet />
            </section>
        </main>
    )
}

export default RootLayout