import {
    FieldErrors,
    FieldValues,
    UseFormHandleSubmit,
    UseFormRegister,
    useForm
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, registrationSchema } from "@/utils/zod"
import { LoginFields, RegistrationFields } from "@/types/forms"
import { useAuthContext } from "@/context/Auth"
import { z } from "zod"

type Properties = {
    handleLoginSubmit: UseFormHandleSubmit<LoginFields, undefined>
    loginErrors: FieldErrors<LoginFields>
    loginRegister: UseFormRegister<LoginFields>
    handleSubmit: UseFormHandleSubmit<RegistrationFields, undefined>
    errors: FieldErrors<RegistrationFields>
    register: UseFormRegister<RegistrationFields>
    onLoginSubmit: (values: FieldValues) => void
    onRegistrationSubmit: (values: FieldValues) => void
}

export function useLoginRegister(): Properties {
    const { login, loginSuccess, registerNewUser } = useAuthContext()
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
        await login(email, password)
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