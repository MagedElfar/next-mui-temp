import { Card, Stack, Stepper, Step, StepLabel, Box, type ButtonProps, type CardProps, type StackProps } from '@mui/material';
import { useState, useRef } from 'react';
import { useFormContext, useFormState } from 'react-hook-form';
import { toast } from 'react-toastify'; // استيراد التوست

import { StepNavigation } from './StepNavigation';
import { StepConfig } from '../../types/common';
import { getAllErrorMessages } from '../../utilities/errors'; // استيراد دالة الأخطاء

interface Props extends CardProps {
    steps: StepConfig[];
    submitText?: string;
    buttonProps?: ButtonProps;
    stackProps?: StackProps;
}

export function MultiStepFormContainer({ steps, submitText, sx, buttonProps, stackProps }: Props) {
    const cardRef = useRef<HTMLDivElement>(null);
    const { trigger } = useFormContext();
    const { errors } = useFormState();
    const [activeStep, setActiveStep] = useState(0);

    const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const fieldsToValidate = steps[activeStep].fields;
        const isStepValid = await trigger(fieldsToValidate as any);

        if (isStepValid) {
            setActiveStep((prev) => prev + 1);
            cardRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            const errorMessages = getAllErrorMessages(errors);
            errorMessages.forEach((err, index) => {
                setTimeout(() => {
                    toast.error(err, { toastId: err });
                }, index * 100);
            });
        }
    };

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setActiveStep((prev) => prev - 1);
    };

    return (
        <Card
            ref={cardRef}
            sx={{ p: { xs: 2, sm: 3 }, borderRadius: 4, ...sx }}
        >
            {/* Stepper Header */}
            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((step) => (
                    <Step key={step.label}>
                        <StepLabel>{step.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <Stack spacing={{ xs: 2, md: 3 }} {...stackProps}>
                <Box>
                    {steps[activeStep].component}
                </Box>

                <StepNavigation
                    activeStep={activeStep}
                    totalSteps={steps.length}
                    onBack={handleBack}
                    onNext={handleNext}
                    submitText={submitText}
                    buttonProps={buttonProps}
                />
            </Stack>
        </Card>
    );
}