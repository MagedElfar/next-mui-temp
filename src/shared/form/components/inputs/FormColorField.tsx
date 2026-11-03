import { TextField, InputAdornment, Box } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import type { FormTextFieldProps } from "./FormTextField";
import FormLabel from "../ui/FormLabel"; // Import the custom external FormLabel component

export type FormColorFieldProps = FormTextFieldProps & {
    required?: boolean;
};

export const FormColorField: React.FC<FormColorFieldProps> = ({
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
                    {/* Render the custom FormLabel above the color field if a label is provided */}
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
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        fullWidth
                        placeholder="#FFFFFF"
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Box
                                            sx={{
                                                width: 24,
                                                height: 24,
                                                borderRadius: '4px',
                                                backgroundColor: field.value || '#6b7280',
                                                border: (theme) => `1px solid ${theme.palette.divider}`,
                                                cursor: 'pointer',
                                                position: 'relative',
                                                overflow: 'hidden'
                                            }}
                                        >
                                            {/* Native color picker input overlaid invisibly for full browser support */}
                                            <input
                                                type="color"
                                                value={field.value || '#6b7280'}
                                                onChange={(e) => field.onChange(e.target.value)}
                                                style={{
                                                    position: 'absolute',
                                                    top: -5,
                                                    left: -5,
                                                    width: '150%',
                                                    height: '150%',
                                                    cursor: 'pointer',
                                                    opacity: 0
                                                }}
                                            />
                                        </Box>
                                    </InputAdornment>
                                ),
                                // Merge any additional slotProps input safely if provided
                                ...(props.slotProps?.input as object),
                            }
                        }}
                    />
                </Box>
            )}
        />
    );
};