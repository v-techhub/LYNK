import CollapsibleSideNavBar from "@/components/sidebar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <main className="overflow-y-hidden h-dvh w-auto flex">
            <CollapsibleSideNavBar />
            <section className=" w-[100dvw]">
                <Outlet />
            </section>
        </main>
    )
}

export default RootLayout