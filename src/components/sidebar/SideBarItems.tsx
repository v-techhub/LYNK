import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { useSideBar } from "./utils"
import { useAuthContext } from "@/context/Auth"

const SideBarItems = ({ collapsible }: { collapsible: boolean }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { logOut, isLoading } = useAuthContext()
  const { navigations } = useSideBar()

  return (
    <TooltipProvider>
      <section className="flex flex-col gap-10 flex-1">
        {navigations.map((item, idx) => {
          return (
            <Tooltip key={idx}>
              <TooltipTrigger>
                <Link to={item.location as string}>
                  <div className={`${location.pathname === item.location ? "text-emerald-500" : "text-gray-500"} group flex items-center gap-3 hover:text-emerald-500 transition-all duration-150 cursor-pointer`}>
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

        <Dialog>
          <DialogTrigger>
            <div className="group flex items-center gap-3 text-gray-500 hover:text-emerald-500 transition-all duration-150 cursor-pointer">
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
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Exit</DialogTitle>
              <DialogDescription>
                Are you sure you want to log out? You will be returned to the login page
              </DialogDescription>
            </DialogHeader>
            <Button disabled={isLoading} onClick={() => logOut(navigate)}>
              {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> logging out</> : "Yes"}
            </Button>
          </DialogContent>
        </Dialog>
      </section>
    </TooltipProvider>
  )
}

export default SideBarItems