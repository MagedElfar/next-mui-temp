import { TextField, MenuItem, Box, type TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import { COUNTRIES } from "@/config/constants";
import { useAppTranslation } from "@/i18n/use-translation";

import FormLabel from "../ui/FormLabel";

export type FormCountrySelectProps = TextFieldProps & {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormCountrySelect: React.FC<FormCountrySelectProps> = ({
    name,
    label,
    required,
    ...props
}) => {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    // Localization hooks for translations
    const tCountries = useAppTranslation("countries");

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box sx={{ width: '100%' }}>
                    {/* Render the custom FormLabel above the country select if a label is provided */}
                    {label && (
                        <FormLabel
                            label={label}
                            required={required}
                        />
                    )}

                    <TextField
                        {...field}
                        // Ensure value defaults to an empty string to prevent uncontrolled input warnings
                        value={field.value ?? ""}
                        {...props}
                        select
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        slotProps={{
                            select: {
                                renderValue: (value) => {
                                    const countryCode = value as string;
                                    const country = COUNTRIES.find(c => c === countryCode);
                                    if (!country) return countryCode;

                                    const translatedName = tCountries(country.toLowerCase() as any);
                                    const flagUrl = `https://flagcdn.com/20x15/${country.toLowerCase()}.png`;

                                    return (
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                            <Box
                                                component="img"
                                                src={flagUrl}
                                                alt={country}
                                                sx={{ width: 20, height: 15, objectFit: 'cover', borderRadius: '2px' }}
                                            />
                                            <span>{translatedName}</span>
                                        </Box>
                                    );
                                },
                                ...(props.slotProps?.select as object),
                            },
                            ...(props.slotProps || {}),
                        }}
                    >
                        {COUNTRIES.map((c) => {
                            const translatedName = tCountries(c.toLowerCase() as any);
                            const flagUrl = `https://flagcdn.com/20x15/${c.toLowerCase()}.png`;

                            return (
                                <MenuItem key={c} value={c}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, width: '100%' }}>
                                        <Box
                                            component="img"
                                            src={flagUrl}
                                            alt={c}
                                            sx={{ width: 20, height: 15, objectFit: 'cover', borderRadius: '2px' }}
                                        />
                                        <span>{translatedName}</span>
                                    </Box>
                                </MenuItem>
                            );
                        })}
                    </TextField>
                </Box>
            )}
        />
    );
};