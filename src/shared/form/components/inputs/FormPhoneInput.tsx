import { Box } from "@mui/material";
import {
    MuiTelInput,
    type MuiTelInputProps,
} from "mui-tel-input";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

import FormLabel from "../ui/FormLabel";

export type FormPhoneInputProps = MuiTelInputProps & {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormPhoneInput: React.FC<FormPhoneInputProps> = ({
    name,
    label,
    required,
    ...props
}) => {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box sx={{ width: '100%' }}>
                    {/* Render the custom FormLabel above the phone input if a label is provided */}
                    {label && (
                        <FormLabel
                            label={label}
                            required={required}
                        />
                    )}

                    <Box dir="ltr">
                        <MuiTelInput
                            {...field}
                            {...props}
                            dir="ltr"
                            defaultCountry="EG"
                            forceCallingCode
                            onlyCountries={["EG", "SA", "AE", "US"]}
                            onChange={(value) => {
                                // Strip all whitespace characters before updating the form state
                                const cleanValue = value.replace(/\s+/g, "");
                                field.onChange(cleanValue);
                            }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                            fullWidth

                        />
                    </Box>


                </Box>
            )}
        />
    );
};