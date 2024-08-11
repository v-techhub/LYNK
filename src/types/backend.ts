export interface User {
    id: string
    username: string
    email: string
    password: string
    profilePicture: File | null
    firstName: string
    lastName: string
    address: string
    city: string
    stateOrProvince: string
    zip: string
    country: string
    phone: string
    firstOccupation: string
    secondOccupation: string
    gender: string
    bio: string,
    joined: Date
}

export interface Chat {
    timeSent: number
    message: string
    senderId: string
    isRead: boolean
}