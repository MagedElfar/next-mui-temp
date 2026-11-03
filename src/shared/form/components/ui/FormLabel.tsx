import { Typography, type TypographyProps } from '@mui/material';
import React from 'react';

interface Props extends TypographyProps {
    label?: string;
    required?: boolean;
    children?: React.ReactNode;
}

export default function FormLabel({
    label,
    required,
    children,
    sx,
    ...props
}: Props) {
    return (
        <Typography
            component="label"
            sx={{
                color: 'text.secondary',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 0.5,
                fontSize: '0.875rem',
                fontWeight: 500,
                ...sx,
            }}
            {...props}
        >
            {label || children}
            {required && (
                <Typography
                    component="span"
                    sx={{
                        color: 'error.main',
                        fontWeight: 'bold',
                        lineHeight: 1
                    }}
                >
                    *
                </Typography>
            )}
        </Typography>
    );
}