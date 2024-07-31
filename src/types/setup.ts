export type FormDataType = {
    profilePicture?: File | null;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    stateOrProvince: string;
    zip: string;
    country: string;
    phone: string;
    firstOccupation: string;
    secondOccupation: string;
    gender: string;
    bio: string;
}

export interface FormProps {
    formData: FormDataType
    onChange: any
    setFormData: React.Dispatch<React.SetStateAction<FormDataType>>
}