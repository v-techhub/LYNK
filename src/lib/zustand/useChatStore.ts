import { create } from "zustand"
import { User } from "@/types/backend"

type useChatStoreType = {
    selectedUser: User | null
    isChatOpen: boolean
    setIsChatOpen: (isChatOpen: boolean) => void
    selectUserChat: (user: User) => void
    isChatOpenOnMobile: boolean
    openChatOnMobile: () => void
    closeChatOnMobile: () => void
}

export const useChatStore = create<useChatStoreType>((set) => (
    {
        selectedUser: null,
        isChatOpen: false,
        setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
        selectUserChat: (user: User) => set({ selectedUser: user }),
        isChatOpenOnMobile: false,
        openChatOnMobile: () => set({ isChatOpenOnMobile: true }),
        closeChatOnMobile: () => set({ isChatOpenOnMobile: false })
    }
))