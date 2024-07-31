import React from "react"
import { User } from "firebase/auth"
import { FormDataType } from "@/types/setup"
import { PRIVATE_PATHS } from "@/routes/paths"
import { NavigateFunction } from "react-router-dom"
import { collection, query, where, onSnapshot, doc, setDoc } from "firebase/firestore";
import { User as UserType } from "@/types/backend"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "./config"

export async function uploadProfilePicture(file: File, userId: string) {
    const storageRef = ref(storage, `profile_pictures/${userId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);

    await setDoc(doc(db, `users/${userId}`), {
        profilePicture: downloadURL
    }, { merge: true })
}

export async function getAllUsers(id: string, setUsers: React.Dispatch<React.SetStateAction<UserType[]>>) {
    const q = query(collection(db, "users"), where("id", "!=", id));
    const allUsers: any[] = [];
    onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            allUsers.push(doc.data());
        });
        setUsers(allUsers)
    });
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
        await setDoc(doc(db, `users/${user?.uid}`), {
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