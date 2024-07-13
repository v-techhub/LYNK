import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useLoginRegister } from "./utils"

export default function LoginRegisterTab() {
 
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
        <section className="h-screen w-screen grid place-items-center p-5">
            <Tabs defaultValue="login" className="w-[400px]">
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
                                    Welcome back to LYNK.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        {...loginRegister("email")}
                                        name="email"
                                        className={`${loginErrors.email && "border-red-500"}`}
                                        autoFocus
                                    />
                                    {loginErrors.email && <span className="text-red-500 text-[10px]">{loginErrors.email.message}</span>}
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        {...register("password")}
                                        name="password"
                                        className={`${loginErrors.password && "border-red-500"}`}
                                    />
                                    {loginErrors.password && <span className="text-red-500 text-[10px]">{loginErrors.password.message}</span>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Login</Button>
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
                                    Create your LYNK account with ease
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <Label htmlFor="email">Username</Label>
                                    <Input
                                        id="text"
                                        {...register("username")}
                                        name="username"
                                        className={`${errors.username && "border-red-500"}`}
                                        autoFocus
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
                                        name="email"
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
                                        name="password"
                                    />
                                    {errors.password && <span className="text-red-500 text-[10px]">{errors.password.message}</span>}
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button type="submit">Register</Button>
                            </CardFooter>
                        </Card>
                    </form>
                </TabsContent>
            </Tabs>
        </section>

    )
}