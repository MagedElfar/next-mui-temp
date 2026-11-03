import { arEG, enUS } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

export const createAppTheme = (isRtl: boolean) => {
    return createTheme({
        cssVariables: {
            colorSchemeSelector: 'class', // Uses class-based switching on <html> or container
        },
        colorSchemes: {
            light: true,
            dark: true,
        },
    },
        isRtl ? arEG : enUS
    );
};