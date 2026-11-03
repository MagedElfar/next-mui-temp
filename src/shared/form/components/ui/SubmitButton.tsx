import { Button, CircularProgress, type ButtonProps } from '@mui/material';
import { useFormState } from 'react-hook-form';

import { useAppTranslation } from '@/i18n/use-translation';

interface SubmitButtonProps extends ButtonProps {
    submitText?: string;
}

export function SubmitButton({
    submitText,
    disabled,
    sx,
    ...props
}: SubmitButtonProps) {
    const { isSubmitting, errors } = useFormState();

    const isUploading = Object.values(errors).some(err => err?.message === "uploading");

    const hasUploadError = Object.values(errors).some(
        (err) => err?.message === "uploading"
    );

    const isButtonDisabled = isSubmitting || isUploading || hasUploadError || disabled;

    const t = useAppTranslation("common");

    return (
        <Button
            type="submit"
            variant="contained"
            color="primary"
            loading={isSubmitting}
            loadingIndicator={
                <CircularProgress size={24} color="inherit" />
            }
            loadingPosition="start"
            disabled={isButtonDisabled}
            sx={{
                width: '250px',
                borderRadius: '50px',
                p: 1,
                position: 'relative',
                ...sx
            }}
            {...props}
        >
            <span style={{ visibility: isSubmitting ? 'hidden' : 'visible' }}>
                {submitText || t("forms.actions.submit")}
            </span>
        </Button>
    );
}