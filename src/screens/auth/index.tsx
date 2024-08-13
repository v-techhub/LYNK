import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginRegister } from "./utils"
import { useAuthContext } from "@/context/Auth"
import React from "react"
import { useNavigate } from "react-router-dom"
import { PRIVATE_PATHS } from "@/routes/paths"
import Meteors from "@/components/magicui/meteors";
import SyncLoader from "react-spinners/SyncLoader";

export default function LoginRegisterTab() {

    const { isLoading, isUserLoading, authenticatedUser } = useAuthContext()

    const navigate = useNavigate()

    React.useEffect(() => {
        if (authenticatedUser !== null) {
            navigate(PRIVATE_PATHS.CHATS_BOARD, { replace: true })
        }
    }, [authenticatedUser])

    const {
        handleLoginSubmit,
        onLoginSubmit,
        loginRegister,
        loginErrors,
        register,
        errors,
        handleSubmit,
        onRegistrationSubmit
    } = useLoginRegister()

    return (
        isUserLoading ? <div className="flex items-center justify-center h-screen">
            <SyncLoader
                color="#10b981"
                loading={isUserLoading}
                size={50}
            />
        </div>
            : <section className="relative bg-gradient-to-t from-emerald-500 to-transparent overflow-hidden h-screen w-screen grid place-items-center p-5">
                <Meteors number={30} />
                <Tabs defaultValue="login" className="md:w-[400px] w-[90dvw] border-none">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                        <form onSubmit={handleLoginSubmit(onLoginSubmit)}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Login</CardTitle>
                                    <CardDescription>
                                        Welcome back to <span className="text-emerald-500 font-bold">LYNK.</span>
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...loginRegister("email")}
                                            className={`${loginErrors.email && "border-red-500"}`}
                                            autoFocus
                                            autoComplete="off"
                                        />
                                        {loginErrors.email && <span className="text-red-500 text-[10px]">{loginErrors.email.message}</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...loginRegister("password")}
                                            className={`${loginErrors.password && "border-red-500"}`}
                                        />
                                        {loginErrors.password && <span className="text-red-500 text-[10px]">{loginErrors.password.message}</span>}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button disabled={isLoading} type="submit" className="bg-emerald-500 text-white">
                                        {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Login"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleSubmit(onRegistrationSubmit)}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Register</CardTitle>
                                    <CardDescription>
                                        Create your <span className="text-emerald-500 font-bold">LYNK</span> account with ease
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="username">Username</Label>
                                        <Input
                                            id="username"
                                            {...register("username")}
                                            className={`${errors.username && "border-red-500"}`}
                                            autoFocus
                                            autoComplete="off"
                                        />
                                        {errors.username && <span className="text-red-500 text-[10px]">{errors.username.message}</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...register("email")}
                                            className={`${errors.email && "border-red-500"}`}
                                            autoComplete="off"
                                        />
                                        {errors.email && <span className="text-red-500 text-[10px]">{errors.email.message}</span>}
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            {...register("password")}
                                            className={`${errors.password && "border-red-500"}`}
                                        />
                                        {errors.password && <span className="text-red-500 text-[10px]">{errors.password.message}</span>}
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <Button disabled={isLoading} className="bg-emerald-500 text-white" type="submit">{isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Register"}</Button>
                                </CardFooter>
                            </Card>
                        </form>
                    </TabsContent>
                </Tabs>
            </section>
    )
}