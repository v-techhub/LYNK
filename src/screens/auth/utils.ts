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
    const {
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
        register: loginRegister,
        reset: loginReset
    } = useForm<LoginFields>({
        resolver: zodResolver(loginSchema)
    })

    const {
        handleSubmit,
        formState: { errors },
        register,
        reset
    } = useForm<RegistrationFields>({
        resolver: zodResolver(registrationSchema)
    })

    function onLoginSubmit(values: FieldValues) {
        console.log(values)
        loginReset()
    }

    function onRegistrationSubmit(values: FieldValues) {
        console.log(values)
        reset()
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