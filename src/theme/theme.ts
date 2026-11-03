import { arEG, enUS } from '@mui/material/locale';
import { createTheme } from '@mui/material/styles';

import { colorSchemes } from './palette';
import { typography } from './typography';

export const createAppTheme = (isRtl: boolean) => {
    return createTheme(
        {
            direction: isRtl ? 'rtl' : 'ltr',
            cssVariables: {
                colorSchemeSelector: 'class',
            },
            colorSchemes,
            typography,
            shape: {
                borderRadius: 8,
            },
        },
        isRtl ? arEG : enUS
    );
};