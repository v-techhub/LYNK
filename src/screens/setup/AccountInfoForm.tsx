import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ShineBorder from "@/components/magicui/shine-border";
import { FormProps } from "@/types/setup"
import { useAnimate } from "framer-motion"

const AccountInfoForm = ({ formData, onChange, setFormData }: FormProps) => {
    const avatar = "https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?w=740&t=st=1719907714~exp=1719908314~hmac=65a964a396911a23e5c9a4ea6c6b34a9c1264986577a88de1ab0be55648b5d29"
    const [scope, animate] = useAnimate()
    const [imagePreview, setImagePreview] = React.useState('')

    React.useEffect(() => {
        async function animateIn() {
            await animate(scope.current, { opacity: 0, x: -100 })
            await animate(scope.current, { opacity: 1, x: 0 })
        }
        animateIn()
    }, [])

    const profilePictureHandler = (e: any) => {
        const file = e.target.files![0]
        const img = URL.createObjectURL(file)
        setImagePreview(img)
        if (file) {
            setFormData(prev => ({
                ...prev,
                ['profilePicture']: file
            }))
        }
    }

    return (
        <section ref={scope}>
            <div className="flex gap-2 items-center">
                <img src={imagePreview || avatar} alt="Profile Picture" className="rounded-full h-24 w-24 border object-cover" />
                <ShineBorder color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} className="active:scale-90 transition-all duration-200 hover:bg-gray-50 shadow-xl w-full place-items-center">
                    <Label className="absolute cursor-pointer w-full text-center h-full mt-12" htmlFor="profilePicture">Set profile picture</Label>
                    <Input
                        type="file"
                        onChange={profilePictureHandler}
                        className="hidden"
                        id="profilePicture"
                        name='profilePicture'
                    />
                </ShineBorder>
            </div>
            <div>
                <Label>First Name</Label>
                <Input
                    name='firstName'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.firstName}
                />
            </div>
            <div>
                <Label>Last Name</Label>
                <Input
                    name='lastName'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.lastName}
                />
            </div>

        </section>
    )
}

export default AccountInfoForm