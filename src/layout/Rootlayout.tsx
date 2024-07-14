import CollapsibleSideNavBar from "@/components/sidebar"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
    return (
        <main className="h-dvh w-dvw flex">
            <CollapsibleSideNavBar />
            <section>
                <Outlet />
            </section>
        </main>
    )
}

export default RootLayout