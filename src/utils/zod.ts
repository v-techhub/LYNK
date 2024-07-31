import { z } from "zod"

export const loginSchema = z.object({
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "must contain at least 6 character(s)" })
})

export const registrationSchema = z.object({
    username: z.string().min(2, { message: "please enter username to continue" }),
    email: z.string().email({ message: "invalid email" }),
    password: z.string().min(6, { message: "must contain at least 6 character(s)" })
})

export const searchUserSchema = z.object({
    query: z.string().min(1, { message: "enter your search to see results" })
})

export const profileSetupSchema = z.object({
    profilePicture: z.string(),
    firstName: z.string().min(1, { message: "first name is empty" }),
    lastName: z.string().min(1, { message: "last name is empty" }),
    address: z.string().min(2, { message: "address is empty" }),
    city: z.string().min(2, { message: "city is empty" }),
    stateOrProvince: z.string().min(2, { message: "state/province is empty" }),
    zip: z.string().min(2, { message: "ZIP is empty" }),
    country: z.string().min(1, { message: "country is empty" }),
    phone: z.string().min(11, { message: "phone must be at least 11 digits long" }),
    occupationOne: z.string().min(2, { message: "hobby is empty" }),
    occupationTwo: z.string().min(2, { message: "hobby is empty" }),
    gender: z.string().min(3, { message: "gender is empty" }),
    bio: z.string().min(2, { message: "bio is empty" }),
})