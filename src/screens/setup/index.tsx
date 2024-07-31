import React, { useState, FormEvent } from "react"
import GridPattern from "@/components/magicui/animated-grid-pattern"
import { useMultiForm } from "./useMultiForm"
import { Button } from "@/components/ui/button"
import { AccountInfoForm, AddressForm, OtherDetails, FormLayout } from "./imports"
import { FormDataType } from "@/types/setup"
import { useToast } from "@/components/ui/use-toast"
import { useNavigate } from "react-router-dom"
import { setUserData, uploadProfilePicture } from "@/firebase/backend"
import { useAuthContext } from "@/context/Auth"

const ProfileSetUp = () => {
    const { authenticatedUser } = useAuthContext()
    const { toast } = useToast()
    const navigate = useNavigate()

    const [formData, setFormData] = useState<FormDataType>({
        profilePicture: null,
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        stateOrProvince: '',
        zip: '',
        country: '',
        phone: '',
        firstOccupation: '',
        secondOccupation: '',
        gender: '',
        bio: ''
    })

    function onChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const {
        steps,
        currentStep,
        nextStep,
        previousStep,
        isFirstStep,
        isLastStep
    } = useMultiForm([
        <FormLayout
            title="Create Your Account"
            children={<AccountInfoForm
                onChange={onChange}
                formData={formData}
                setFormData={setFormData}
            />}
        />,
        <FormLayout
            title="Add Your Address"
            children={<AddressForm
                onChange={onChange}
                formData={formData}
                setFormData={setFormData}
            />}
        />,
        <FormLayout
            title="Complete Your Profile"
            children={<OtherDetails
                onChange={onChange}
                formData={formData}
                setFormData={setFormData}
            />}
        />
    ])

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const emptyFields = []
        for (const [key, value] of Object.entries(formData)) {
            if (value === "") {
                emptyFields.push(key)
            }
        }
        const allEmptyFields = emptyFields.join(" | ")
        if (emptyFields.length > 0 && isLastStep) {
            toast({
                title: "Are you sure you completed the form?",
                description: `please fill the following - ${allEmptyFields}`,
            })
        }
        if (emptyFields.length === 0 && isLastStep) {
            await setUserData(authenticatedUser, toast, navigate, formData)
            await uploadProfilePicture(formData.profilePicture as File, authenticatedUser?.uid as string)
        }
    }

    return (
        <section className="grid place-items-center h-screen">
            <GridPattern className="opacity-40" /> {/* as background */}
            <form className="bg-transparent border shadow-2xl p-3 rounded-lg w-[90dvw] md:w-[500px] backdrop-blur" onSubmit={handleSubmit}>
                <div className="text-7xl text-center font-semibold bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-300 text-transparent">LYNK.</div>
                <p className="text-gray-600 text-center m-2">Connect with the world, one conversation at a time - start by creating your account!</p>
                <div>
                    {steps[currentStep]}
                </div>
                <fieldset className="flex gap-2 mt-3">
                    {!isFirstStep && <Button className="bg-emerald-500 backdrop-blur-sm flex gap-2" onClick={previousStep}>
                        Previous
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </Button>}
                    {!isLastStep && <Button className="bg-emerald-500 backdrop-blur-sm flex gap-2" onClick={nextStep}>
                        Next
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="size-6">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </Button>}
                    {isLastStep && <Button className="bg-emerald-500 backdrop-blur-sm flex gap-2" type="submit">Finish</Button>}
                </fieldset>
            </form>
        </section >
    )
}

export default ProfileSetUp