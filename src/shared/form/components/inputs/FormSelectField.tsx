import { TextField, MenuItem, Box, type TextFieldProps } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import FormLabel from "../ui/FormLabel";

export type FormSelectFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    required?: boolean;
    options: { label: string; value: string | number }[]; // Support string or number for values
};

export const FormSelectField: React.FC<FormSelectFieldProps> = ({
    name,
    label,
    required,
    options,
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
                    {/* Render the custom FormLabel above the select field if a label is provided */}
                    {label && (
                        <FormLabel label={label} required={required} />
                    )}

                    <TextField
                        {...field}
                        // Ensure the value defaults to an empty string to prevent React warnings
                        value={field.value ?? ""}
                        {...props}
                        select
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    >
                        {options.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            )}
        />
    );
};