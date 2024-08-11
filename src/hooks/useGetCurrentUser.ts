import { useEffect } from "react"
import { useUserStore } from "@/lib/zustand/useUserStore"
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { useAuthContext } from "@/context/Auth"
import { User } from "@/types/backend";
import { FIRESTORE_DB_COLLECTIONS } from "@/firebase/constants";

export async function getCurrentUser(id: string): Promise<User | null> {
    const docRef = doc(db, `${FIRESTORE_DB_COLLECTIONS.USERS}`, id);
    const docSnap = await getDoc(docRef);
    return docSnap.data() as User | null
}

export const useGetCurrentUser = () => {
    const { authenticatedUser } = useAuthContext();
    const setUser = useUserStore((state) => state.setUser);
    const data = useUserStore((state) => state.userData)

    useEffect(() => {
        if (authenticatedUser?.uid) {
            getCurrentUser(authenticatedUser.uid).then(setUser).catch(err => {
                console.error("Error fetching user - ", err)
            })
        }
    }, [authenticatedUser, setUser]);

    return { data }
};