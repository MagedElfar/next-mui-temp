import { Card, Stack, type ButtonProps, type CardProps, type StackProps } from '@mui/material';
import { useEffect, useRef, type ReactNode } from 'react';
import { useFormState } from 'react-hook-form';

import { SubmitButton } from './SubmitButton';
import { getFirstErrorPath } from '../../utilities/errors';

interface Props extends CardProps {
    children: ReactNode;
    submitText?: string;
    buttonProps?: ButtonProps;
    stackProps?: StackProps;
    actions?: ReactNode;
}

export function FormContainer({
    children,
    submitText,
    sx,
    buttonProps,
    stackProps,
    actions
}: Props) {
    const cardRef = useRef<HTMLDivElement>(null);

    const { errors, submitCount, isSubmitted } = useFormState();

    useEffect(() => {
        if (!isSubmitted || Object.keys(errors).length === 0) return;

        const fullErrorPath = getFirstErrorPath(errors);
        if (fullErrorPath) {
            const firstErrorPath = fullErrorPath.split('.')[0];

            const fieldElement =
                document.querySelector(`[name="${firstErrorPath}"]`) ||
                document.querySelector(`[name="${fullErrorPath}"]`) ||
                document.querySelector(`[data-test="${CSS.escape(firstErrorPath)}"]`);

            if (fieldElement) {
                fieldElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                });

                fieldElement.classList.add('animate-shake');

                const timer = setTimeout(() => {
                    (fieldElement as HTMLElement).focus?.();
                    fieldElement.classList.remove('animate-shake');
                }, 400);

                return () => clearTimeout(timer);
            }
        }
    }, [errors, isSubmitted, submitCount]);

    return (
        <Card
            ref={cardRef}
            sx={{
                p: { xs: 2, sm: 3 },
                borderRadius: 4,
                ...sx
            }}
        >
            <Stack spacing={{ xs: 2, md: 3 }} {...stackProps}>
                {children}
                {actions ? (
                    actions
                ) : (
                    <SubmitButton
                        submitText={submitText}
                        {...buttonProps}
                    />
                )}
            </Stack>
        </Card>
    );
}