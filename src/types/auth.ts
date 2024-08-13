import { User } from "firebase/auth"
import { NavigateFunction } from "react-router-dom"

export interface AuthContextInterface {
    authenticatedUser: User | null
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    loginSuccess: boolean
    login: (email: string, password: string, navigate: NavigateFunction) => Promise<void>
    registerNewUser: (email: string, password: string, username: string, navigate: NavigateFunction) => Promise<void>
    logOut: (navigate: NavigateFunction) => Promise<void>
    isUserLoading: boolean
}