import { TextField, type TextFieldProps, Box } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import FormLabel from "../ui/FormLabel";

export type FormTextFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormTextField: React.FC<FormTextFieldProps> = ({
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
                    {/* Render the custom FormLabel above the input if a label is provided */}
                    {label && (
                        <FormLabel label={label} required={required} />
                    )}

                    <TextField
                        {...field}
                        value={field.value ?? ""}
                        {...props}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                    />
                </Box>
            )}
        />
    );
};