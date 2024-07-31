import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { FormProps } from "@/types/setup"
import { useAnimate } from "framer-motion"

export default function Details({ formData, onChange, setFormData }: FormProps) {
    const [scope, animate] = useAnimate()

    React.useEffect(() => {
        async function animateIn() {
            await animate(scope.current, { opacity: 0, x: -100 })
            await animate(scope.current, { opacity: 0, x: 0 })
            await animate(scope.current, { opacity: 1, x: 0 })
        }
        animateIn()
    }, [])

    const handleRadioElement = (value: string) => {
        setFormData(prev => ({
            ...prev,
            ['gender']: value
        }))
    }
    return (
        <section ref={scope}>
            <div>
                <Label>Phone number</Label>
                <Input
                    name='phone'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.phone}
                />
            </div>
            <div>
                <Label>Occupation/Career 1</Label>
                <Input
                    name='firstOccupation'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.firstOccupation}
                />
            </div>
            <div>
                <Label>Occupation/Career 2</Label>
                <Input
                    name='secondOccupation'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.secondOccupation}
                />
            </div>
            <div>
                <Label>Gender</Label>
                <RadioGroup onValueChange={handleRadioElement} value={formData.gender} className="flex " name="gender">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem className="text-emerald-600 border-emerald-600" value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem className="text-emerald-600 border-emerald-600" value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
            </div>
            <div>
                <Label>Bio</Label>
                <Textarea
                    name='bio'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.bio}
                />
            </div>
        </section>
    )
}