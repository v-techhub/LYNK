import { ReactNode, useState } from "react"

export function useMultiForm(steps: ReactNode[]) {
    const [currentStep, setCurrentStep] = useState(0)

    const isFirstStep = currentStep === 0
    const isLastStep = currentStep === steps.length - 1

    const nextStep = () => {
        if (currentStep === steps.length - 1) return currentStep
        setCurrentStep(prevStep => prevStep + 1)
    }

    const previousStep = () => {
        if (currentStep === 0) return currentStep
        setCurrentStep(prevStep => prevStep - 1)
    }

    const jumpToStep = (idx: number) => setCurrentStep(idx)

    return {
        nextStep,
        previousStep,
        jumpToStep,
        steps,
        currentStep,
        isFirstStep,
        isLastStep
    }
}