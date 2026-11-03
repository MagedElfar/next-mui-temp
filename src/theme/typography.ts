// src/theme/typography.ts
import { ThemeOptions } from '@mui/material/styles';

export const typography: ThemeOptions['typography'] = {
    fontFamily: 'var(--font-primary), sans-serif',
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
    },
    h4: {
        fontSize: '1.75rem',
        fontWeight: 600,
    },
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
    },
};