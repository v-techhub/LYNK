import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { countries } from "./utils"
import { FormProps } from "@/types/setup"
import { useAnimate } from "framer-motion"

const AddressForm = (props: FormProps) => {
    const [scope, animate] = useAnimate()

    React.useEffect(() => {
        async function animateIn() {
            await animate(scope.current, { opacity: 0, x: -100 })
            await animate(scope.current, { opacity: 1, x: 0 })
        }
        animateIn()
    }, [])

    const { formData, onChange, setFormData } = props
    const handleSelectElement = (value: string) => {
        setFormData(prev => ({
            ...prev,
            ['country']: value
        }))
    }
    return (
        <section ref={scope}>
            <div>
                <Label>Address</Label>
                <Input
                    name='address'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.address}
                />
            </div>
            <div>
                <Label>City</Label>
                <Input
                    name='city'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.city}
                />
            </div>
            <div>
                <Label>State/Province</Label>
                <Input
                    name='stateOrProvince'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.stateOrProvince}
                />
            </div>
            <div>
                <Label>ZIP/Postal code</Label>
                <Input
                    name='zip'
                    onChange={onChange}
                    autoComplete="off"
                    value={formData.zip}
                />
            </div>
            <div>
                <Label>Country</Label>
                <Select onValueChange={handleSelectElement} value={formData.country} name='country'>
                    <SelectTrigger>
                        <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Countries</SelectLabel>
                            {countries.map((country, idx) => (
                                <SelectItem key={idx} value={country}>{country}</SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </section>
    )
}

export default AddressForm