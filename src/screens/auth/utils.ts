import {
    FieldErrors,
    FieldValues,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, registrationSchema } from "@/utils/zod"
import { useAuthContext } from "@/context/Auth"
import { z } from "zod"
import { useNavigate } from "react-router-dom"

type Properties = {
    handleLoginSubmit: UseFormHandleSubmit<z.infer<typeof loginSchema>, undefined>
    loginErrors: FieldErrors<z.infer<typeof loginSchema>>
    loginRegister: UseFormRegister<z.infer<typeof loginSchema>>
    handleSubmit: UseFormHandleSubmit<z.infer<typeof registrationSchema>, undefined>
    errors: FieldErrors<z.infer<typeof registrationSchema>>
    register: UseFormRegister<z.infer<typeof registrationSchema>>
    onLoginSubmit: (values: FieldValues) => void
    onRegistrationSubmit: (values: FieldValues) => void
}

export function useLoginRegister(): Properties {
    const { login, loginSuccess, registerNewUser } = useAuthContext()

    const navigate = useNavigate()

    const {
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        register: loginRegister,
        reset: loginReset
    } = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema)
    })

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<z.infer<typeof registrationSchema>>({
        resolver: zodResolver(registrationSchema)
    })

    async function onLoginSubmit(values: FieldValues) {
        const { email, password } = values
        await login(email, password, navigate)
        loginSuccess && loginReset()
    }

    async function onRegistrationSubmit(values: FieldValues) {
        const { username, email, password } = values
        await registerNewUser(email, password, username)
        loginSuccess && reset()
    }

    return {
        handleLoginSubmit,
        loginErrors,
        loginRegister,
        handleSubmit,
        errors,
        register,
        onLoginSubmit,
        onRegistrationSubmit
    }
}