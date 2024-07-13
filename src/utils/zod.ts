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