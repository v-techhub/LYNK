import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    updateProfile
} from "firebase/auth"
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState
} from "react"
import { auth } from "@/firebase/config"
import { AuthContextInterface } from "@/types/auth"
import { useToast } from "@/components/ui/use-toast"
import { signInWithEmailAndPassword } from "firebase/auth"
import { ToastAction } from "@radix-ui/react-toast"
import { PRIVATE_PATHS, PUBLIC_PATHS } from "@/routes/paths"
import { NavigateFunction } from "react-router-dom"

const AuthContext = createContext<AuthContextInterface>({
    authenticatedUser: null,
    isLoading: false,
    setIsLoading: () => { },
    loginSuccess: false,
    login: async () => { },
    registerNewUser: async () => { },
    logOut: async () => { },
    isUserLoading: false
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [loginSuccess, setLoginSuccess] = useState(false)
    const { toast } = useToast()
    const [isUserLoading, setIsUserLoading] = useState(true)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setAuthenticatedUser(user)
            setIsUserLoading(false)
        })
    }, [authenticatedUser]) //listens for authenticated user

    async function registerNewUser(email: string, password: string, username: string, navigate: NavigateFunction) {
        try {
            setIsLoading(true)
            const res = await createUserWithEmailAndPassword(auth, email, password)
            await updateProfile(res.user, { displayName: username })
            toast({
                title: "Registration Successful",
                description: `Congratulations and welcome to LYNK, ${res.user?.displayName} 🖐️!`,
                action: (
                    <ToastAction className="border p-2 text-nowrap rounded-md hover:bg-slate-100" altText="ok">OK</ToastAction>
                ),
            })
            setLoginSuccess(true) //for controlling the input states, e.g if false input states persists, else it becomes empty
            setTimeout(() => {
                setIsLoading(false)
                navigate(PUBLIC_PATHS.SETUP)
            })
        } catch (err) {
            setIsLoading(false)
            setLoginSuccess(false)
            err instanceof Error && toast({
                title: "Uh oh! Something went wrong." + err.message,
                description: "There was a problem with your request ☹️.",
                action: (
                    <ToastAction className="border p-2 rounded-md hover:bg-slate-100" altText="Try again">Try Again</ToastAction>
                ),
            })
        }
    }

    async function login(email: string, password: string, navigate: NavigateFunction) {
        try {
            setIsLoading(true)
            const res = await signInWithEmailAndPassword(auth, email, password)
            toast({
                title: "Login Successful",
                description: `Welcome aboard ${res.user?.displayName}!`,
                action: (
                    <ToastAction className="border p-2 rounded-md hover:bg-slate-100" altText="cancel">OK</ToastAction>
                ),
            })
            setLoginSuccess(true)
            setTimeout(() => {
                setIsLoading(false)
                navigate(PRIVATE_PATHS.CHATS_BOARD, { replace: true })
            }, 300)
        } catch (err) {
            err instanceof Error && toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request ☹️.",
                action: (
                    <ToastAction className="border p-2 rounded-md hover:bg-slate-100" altText="Try again">Try Again</ToastAction>
                ),
            })
            setIsLoading(false)
            setLoginSuccess(false)
        }
    }

    const logOut = async (navigate: NavigateFunction) => {
        try {
            setIsLoading(true)
            await signOut(auth)
            setAuthenticatedUser(null)
            toast({
                title: "Signed Out Successful",
                description: `We hope to see you again 😃, ${authenticatedUser?.displayName}!`,
                action: (
                    <ToastAction className="border p-2 rounded-md hover:bg-slate-100" altText="cancel">OK</ToastAction>
                ),
            })
            setTimeout(() => {
                navigate(PUBLIC_PATHS.AUTH)
                setIsLoading(false)
            }, 3000)
        } catch (err) {
            err instanceof Error && toast({
                title: "Uh oh! Something went wrong.",
                description: "Error logging out ☹️.",
                action: (
                    <ToastAction className="border p-2 rounded-md hover:bg-slate-100" altText="Try again">Try Again</ToastAction>
                ),
            })
            setIsLoading(false)
        }

    }

    const contextValues = {
        authenticatedUser,
        isLoading,
        setIsLoading,
        loginSuccess,
        login,
        registerNewUser,
        logOut,
        isUserLoading
    }

    return <AuthContext.Provider value={contextValues}>
        {children}
    </AuthContext.Provider>
}

export const useAuthContext = () => useContext(AuthContext)