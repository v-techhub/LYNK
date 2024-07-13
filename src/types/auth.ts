import { User } from "firebase/auth"

export interface AuthContextInterface {
    authenticatedUser: User | null
    isLoading: boolean
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
    loginSuccess: boolean
    login: (email: string, password: string) => Promise<void>
    registerNewUser: (email: string, password: string, username: string) => Promise<void>
}