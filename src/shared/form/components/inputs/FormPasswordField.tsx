import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TextField, IconButton, InputAdornment, Box, type TextFieldProps } from "@mui/material";
import { useBoolean } from 'minimal-shared/hooks';
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import FormLabel from "../ui/FormLabel";

export type FormPasswordFieldProps = TextFieldProps & {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormPasswordField: React.FC<FormPasswordFieldProps> = ({
    name,
    label,
    required,
    ...props
}) => {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    // Manage password visibility state
    const showPassword = useBoolean();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box sx={{ width: '100%' }}>
                    {/* Render the custom FormLabel above the password input if a label is provided */}
                    {label && (
                        <FormLabel
                            label={label}
                            required={required}
                        />
                    )}

                    <TextField
                        {...field}
                        // Ensure the value defaults to an empty string to prevent React warnings
                        value={field.value ?? ""}
                        {...props}
                        type={showPassword.value ? 'text' : 'password'}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={showPassword.onToggle}
                                            edge="end"
                                            size="small"
                                            aria-label="toggle password visibility"
                                        >
                                            {showPassword.value ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                // Merge any additional InputProps if passed via props safely
                                ...(props.slotProps?.input as object),
                            }
                        }}
                    />
                </Box>
            )}
        />
    );
};