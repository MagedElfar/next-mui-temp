import { Box } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, type DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React from "react";
import { useFormContext, Controller } from "react-hook-form";

import FormLabel from "../ui/FormLabel"; // Import the custom external FormLabel component

export type FormDatePickerProps = Omit<DatePickerProps, "value" | "onChange" | "label"> & {
    name: string;
    label?: string;
    required?: boolean;
};

export const FormDatePicker: React.FC<FormDatePickerProps> = ({
    name,
    label,
    required,
    ...props
}) => {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    // Check if the picker is configured to display year-only mode
    const isYearOnly = props.views?.length === 1 && props.views[0] === 'year';

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value, ...field }, fieldState }) => (
                    <Box sx={{ width: '100%' }}>
                        {/* Render the custom FormLabel above the date picker if a label is provided */}
                        {label && (
                            <FormLabel
                                label={label}
                                required={required}
                            />
                        )}

                        <DatePicker
                            {...field}
                            {...props}
                            // Safely handle dayjs value parsing for standard dates or year-only values
                            value={value ? (isYearOnly && typeof value === 'number' ? dayjs().year(value) : dayjs(value)) : null}
                            onChange={(date) => {
                                if (!date) {
                                    onChange(null);
                                    return;
                                }

                                if (isYearOnly) {
                                    onChange(date.year());
                                } else {
                                    onChange(date.format("YYYY-MM-DD"));
                                }
                            }}
                            slotProps={{
                                field: {
                                    clearable: true,
                                    onClear: () => onChange(null),
                                },
                                textField: {
                                    fullWidth: true,
                                    error: !!fieldState.error,
                                    helperText: fieldState.error?.message,
                                },
                            }}
                        />
                    </Box>
                )}
            />
        </LocalizationProvider>
    );
};