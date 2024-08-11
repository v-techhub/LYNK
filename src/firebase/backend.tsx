import React from "react"
import { User } from "firebase/auth"
import { FormDataType } from "@/types/setup"
import { PRIVATE_PATHS } from "@/routes/paths"
import { NavigateFunction } from "react-router-dom"
import {
    collection,
    query,
    where,
    onSnapshot,
    doc,
    setDoc,
    getDocs,
    deleteDoc,
    arrayUnion
} from "firebase/firestore";
import { User as UserType, Chat } from "@/types/backend"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config"
import { FIRESTORE_DB_COLLECTIONS } from "./constants"

const { USERS, CONNECTIONS, CHATS } = FIRESTORE_DB_COLLECTIONS

export async function getChat(userId: string, id: string, setChat: any) {
    try {
        const docRef = doc(db, `${CHATS}/${userId}/messages/${id}`);
        onSnapshot(docRef, docSnapshot => {
            if (docSnapshot.exists()) {
                if (docSnapshot.data().chatID === id) {
                    setChat(docSnapshot.data().chats)
                }
            }
            if (!docSnapshot.exists()) {
                setChat([])
            }
        })
    } catch (err) {
        console.error("Error fetching chats", err)
    }
}

export function checkMessageStatus(isChatOpen: boolean, selectedChat: UserType) {
    if (isChatOpen && selectedChat) {
        //update message status
    }
}

export async function sendMessage(userId: string, id: string, data: Chat) {
    try {
        await setDoc(doc(db, `${CHATS}/${userId}/messages/${id}`), {
            chatID: id,
            chats: arrayUnion(data),
        }, { merge: true })

        await setDoc(doc(db, `${CHATS}/${id}/messages/${userId}`), {
            chatID: userId,
            chats: arrayUnion(data)
        }, { merge: true })
    } catch (err) {
        err instanceof Error && console.error(err.message)
    }
}

export async function deleteConnectedUser(userId: string, id: string) {
    try {
        await deleteDoc(doc(db, `${CONNECTIONS}/${userId}/${id}`))
    } catch (err) {
        console.log("Error deleting user", err)
    }
}

export async function fetchConnectedUsers(userId: string, setConnectedUsers: any): Promise<void> {
    try {
        const q = query(collection(db, `${CONNECTIONS}`), where("id", "==", `${userId}`))
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach(doc => {
            if (doc.exists()) {
                setConnectedUsers(doc.data().users as UserType)
            }
        })
    } catch (err) {
        console.error("Error fetching connected users ", err)
    }
}

export async function checkConnection(userId: string, user: UserType): Promise<boolean> {
    let isConnected: boolean = false
    try {
        const q = query(collection(db, `${CONNECTIONS}`), where("id", "==", `${userId}`));
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            if (doc.exists()) {
                const ids = doc.data().users.map((user: UserType) => user.id)
                if (ids.includes(user.id)) isConnected = true
            }
        })
    } catch (err) {
        console.error("Error checking connected user ", err)
    }
    return isConnected
}

export async function connectNewUser(user: UserType, userId: string, setIsConnecting: React.Dispatch<React.SetStateAction<boolean>>, currentUserData: UserType) {
    try {
        setIsConnecting(true)
        await setDoc(doc(db, `${CONNECTIONS}/${userId}`), {
            id: userId,
            users: arrayUnion({
                connectionDate: Date.now(),
                ...user
            })
        }, { merge: true })
        //connects the other user
        await setDoc(doc(db, `${CONNECTIONS}/${user.id}`), {
            id: user.id,
            users: arrayUnion({
                connectionDate: Date.now(),
                ...currentUserData
            })
        }, { merge: true })
        setIsConnecting(false)
    } catch (err) {
        console.error("Error connecting user ", err)
        setIsConnecting(false)
    }
}

export async function uploadProfilePicture(file: File, userId: string) {
    try {
        const storageRef = ref(storage, `profile_pictures/${userId}/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);

        await setDoc(doc(db, `${USERS}/${userId}`), {
            profilePicture: downloadURL
        }, { merge: true })
    } catch (err) {
        console.error("Error updating profile picture ", err)
    }
}

export async function getAllUsers(id: string, setUsers: React.Dispatch<React.SetStateAction<UserType[]>>) {
    try {
        const q = query(collection(db, `${USERS}`), where("id", "!=", id));
        const allUsers: any[] = [];
        onSnapshot(q, (querySnapshot) => {
            querySnapshot.forEach((doc) => {
                allUsers.push(doc.data());
            });
            setUsers(allUsers)
        });
    } catch (err) {
        console.log("Error getting all users ", err)
    }
}

export async function setUserData(user: User | null, toast: any, navigate: NavigateFunction, formData: FormDataType) {
    const {
        firstName,
        lastName,
        address,
        city,
        stateOrProvince,
        zip,
        country,
        phone,
        firstOccupation,
        secondOccupation,
        gender,
        bio,
    } = formData

    try {
        await setDoc(doc(db, `${USERS}/${user?.uid}`), {
            id: user?.uid,
            username: user?.displayName,
            email: user?.email,
            password: "",
            firstName,
            lastName,
            address,
            city,
            stateOrProvince,
            zip,
            country,
            phone,
            firstOccupation,
            secondOccupation,
            gender,
            bio,
            joined: Date.now()
        })

        toast({
            title: "Congratulations",
            description: `You will redirected to your dashboard`,
        })
        setTimeout(() => navigate(PRIVATE_PATHS.CHATS_BOARD, { replace: true }), 2 * 1000)

    } catch (err) {
        console.log(err)
        toast({
            title: "Oops, something went wrong",
            description: `${err}`,
        })
    }
}