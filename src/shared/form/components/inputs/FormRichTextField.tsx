import { Box, FormHelperText, alpha } from "@mui/material";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import ReactQuill from "react-quill-new";

import "react-quill-new/dist/quill.snow.css";
import FormLabel from "../ui/FormLabel";

export type FormRichTextFieldProps = {
    name: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    height?: number | string;
};

export const FormRichTextField: React.FC<FormRichTextFieldProps> = ({
    name,
    label,
    required,
    placeholder,
    height = 200
}) => {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Box sx={{ mb: 2, width: '100%' }}>
                    {/* Render the custom FormLabel above the editor if a label is provided */}
                    {label && (
                        <FormLabel
                            label={label}
                            required={required}
                            sx={{ color: fieldState.error ? 'error.main' : 'text.secondary' }}
                        />
                    )}

                    <Box
                        sx={{
                            '& .ql-toolbar': {
                                borderTopLeftRadius: '8px',
                                borderTopRightRadius: '8px',
                                borderColor: fieldState.error ? 'error.main' : 'divider',
                                backgroundColor: (theme) => alpha(theme.palette.divider, 0.1),
                                '& .ql-stroke': {
                                    stroke: (theme) => theme.palette.text.primary,
                                },
                                '& .ql-fill': {
                                    fill: (theme) => theme.palette.text.primary,
                                },
                                '& .ql-picker': {
                                    color: (theme) => theme.palette.text.primary,
                                },
                                // Dropdown options menu styling
                                '& .ql-picker-options': {
                                    backgroundColor: (theme) => theme.palette.background.paper,
                                    color: (theme) => theme.palette.text.primary,
                                    border: (theme) => `1px solid ${theme.palette.divider} !important`,
                                    boxShadow: (theme) => theme.shadows[3],
                                    borderRadius: '4px',
                                    padding: '8px',
                                },
                            },
                            '& .ql-container': {
                                height: height,
                                borderBottomLeftRadius: '8px',
                                borderBottomRightRadius: '8px',
                                borderColor: fieldState.error ? 'error.main' : 'divider',
                                fontSize: '1rem',
                                fontFamily: 'inherit',
                                backgroundColor: (theme) => theme.palette.background.paper,
                                color: (theme) => theme.palette.text.primary,
                            },
                            '& .ql-editor.ql-blank::before': {
                                color: 'text.disabled',
                                fontStyle: 'normal'
                            }
                        }}
                    >
                        <ReactQuill
                            theme="snow"
                            {...field}
                            value={field.value || ''}
                            onChange={(content) => field.onChange(content)}
                            placeholder={placeholder}
                        />
                    </Box>

                    {/* Display validation error message if present */}
                    {fieldState.error && (
                        <FormHelperText error sx={{ mt: 1, fontWeight: 500 }}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </Box>
            )}
        />
    );
};