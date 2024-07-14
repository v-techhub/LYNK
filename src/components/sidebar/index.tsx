import { useSideBar } from "./utils"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Link, useNavigate } from "react-router-dom"
import { useAuthContext } from "@/context/Auth"

const CollapsibleSideNavBar = () => {
    const { authenticatedUser, logOut } = useAuthContext()
    const navigate = useNavigate()
    const {
        navigations,
        collapsible,
        toggleCollapsible,
        handleActiveNavigation
    } = useSideBar()

    return (
        <nav className={`relative ${collapsible ? "w-16 justify-center" : "w-[150px]"} flex flex-col bg-slate-900 px-2 py-5 transition-all duration-200`}>
            <section className="mb-14">
                <div className={`text-4xl font-semibold bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-300 text-transparent`}>
                    {collapsible ? "L." : "LYNK."}
                </div>
            </section>
            <TooltipProvider>
                <section className="flex flex-col gap-10 flex-1">
                    {navigations.map((item, idx) => {
                        return (
                            <Tooltip key={idx}>
                                <TooltipTrigger>
                                    <Link to={item.location as string} onClick={() => handleActiveNavigation(item.location as string)}>
                                        <div className={`${handleActiveNavigation(item.location as string) ? "text-emerald-500" : "text-gray-500"} text-gray-500 group flex items-center gap-3 hover:text-emerald-500 transition-all duration-150 cursor-pointer`}>
                                            <i className="group-hover:scale-125 transition duration-300">{item.icon}</i>
                                            <p className={`${collapsible && "hidden"} text-nowrap `}>{item.name}</p>
                                        </div>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent align="end">
                                    {item.name}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    <div onClick={() => logOut(navigate)} className="group flex items-center gap-3 text-gray-500 hover:text-emerald-500 transition-all duration-150 cursor-pointer">
                        <i className="group-hover:scale-125 transition duration-300">
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
                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                                />
                            </svg>
                        </i>
                        <p className={`${collapsible && "hidden"} text-nowrap `}>Sign Out</p>
                    </div>
                </section>
            </TooltipProvider>
            <section className="flex items-center gap-3 text-gray-500">
                <img
                    className="rounded-full w-12 h-12 object-contain"
                    src="/3d-cartoon-style-character.jpg"
                    alt="Profile Image"
                />
                <p className={` ${collapsible ? "hidden" : ""}`}>Hi 🖐️, {authenticatedUser?.displayName}</p>
            </section>
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