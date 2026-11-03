import { Button } from '@mui/material';

import { useAppTranslation } from '@/i18n/use-translation';

import { SubmitButton } from './SubmitButton';

interface StepNavigationProps {
    activeStep: number;
    totalSteps: number;
    onBack: (e: React.MouseEvent<HTMLButtonElement>) => void;
    onNext: (e: React.MouseEvent<HTMLButtonElement>) => void;
    submitText?: string;
    buttonProps?: any;
}

export function StepNavigation({
    activeStep,
    totalSteps,
    onBack,
    onNext,
    submitText,
    buttonProps
}: StepNavigationProps) {
    const t = useAppTranslation("common");
    const isLastStep = activeStep === totalSteps - 1;

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', marginTop: '16px' }}>
            {activeStep !== 0 && (
                <Button
                    onClick={onBack}
                    variant="outlined"
                    type="button"
                    sx={{ borderRadius: '50px', width: '150px' }}
                >
                    {t("forms.actions.back")}
                </Button>
            )}

            {!isLastStep ? (
                <Button
                    onClick={onNext}
                    variant="contained"
                    type="button"
                    sx={{ borderRadius: '50px', width: '150px' }}
                >
                    {t("forms.actions.next")}
                </Button>
            ) : (
                <SubmitButton
                    submitText={submitText}
                    sx={{
                        width: '200px',
                        borderRadius: '50px',
                        p: 1,
                        ...buttonProps?.sx
                    }}
                    {...buttonProps}
                />
            )}
        </div>
    );
}