import ProfileInfo from "./ProfileInfo"
import SideBarItems from "./SideBarItems"
import { useSideBar } from "./utils"
import { useChatStore } from "@/lib/zustand/useChatStore"

const CollapsibleSideNavBar = () => {
    const { collapsible, toggleCollapsible } = useSideBar()
    const isChatOpenOnMobile = useChatStore(states => states.isChatOpenOnMobile)

    return (
        <nav className={`relative h-screen ${collapsible ? "w-16 justify-center" : "w-[150px]"} ${isChatOpenOnMobile ? "hidden" : "flex"} flex-col bg-gray-950 px-2 py-5 transition-all duration-200`}>
            <section className="mb-14">
                <div className={`text-4xl font-semibold bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-300 text-transparent`}>
                    {collapsible ? "L." : "LYNK."}
                </div>
            </section>
            <SideBarItems collapsible={collapsible} />
            <ProfileInfo collapsible={collapsible} />
            <div className="absolute z-20 bottom-20 -right-4 text-gray-500 bg-gray-300 p-2 rounded-md w-fit hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer hover:shadow-xl" onClick={toggleCollapsible}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d={`${collapsible
                            ? "M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                            : "M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"}`}
                    />
                </svg>
            </div>

        </nav >
    )
}

export default CollapsibleSideNavBar