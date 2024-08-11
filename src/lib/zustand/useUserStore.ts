import { create } from "zustand"
import { User } from "@/types/backend"

type useUserStoreTypes = {
    userData: User | null
    setUser: (user: User | null) => void
    connectedUsers: User[]
    setConnectedUsers: (users: User[]) => void
}

export const useUserStore = create<useUserStoreTypes>((set) => {
    return {
        userData: null,
        setUser: (userData) => set({ userData }),
        connectedUsers: [],
        setConnectedUsers: (connectedUsers) => set({ connectedUsers })
    }
})
