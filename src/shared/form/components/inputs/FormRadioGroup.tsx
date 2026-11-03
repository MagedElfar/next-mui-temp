import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormHelperText,
    type RadioGroupProps,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

import { RadioOption } from "../../types/common";
import FormLabel from "../ui/FormLabel";

export type FormRadioGroupProps = RadioGroupProps & {
    name: string;
    label?: string;
    required?: boolean;
    options: RadioOption[];
};

export function FormRadioGroup({
    name,
    label,
    required,
    options,
    ...props
}: FormRadioGroupProps) {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <FormControl error={!!fieldState.error} component="fieldset" sx={{ width: '100%' }}>
                    {/* Render the custom FormLabel above the radio group if a label is provided */}
                    {label && (
                        <FormLabel
                            label={label}
                            required={required}
                            sx={{ color: fieldState.error ? 'error.main' : 'text.secondary' }}
                        />
                    )}

                    <RadioGroup
                        {...field}
                        {...props}
                        // Ensure the value defaults to an empty string to prevent uncontrolled warnings
                        value={field.value ?? ""}
                    >
                        {options.map((option) => (
                            <FormControlLabel
                                key={option.value}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                            />
                        ))}
                    </RadioGroup>

                    {/* Display validation error message if present */}
                    {fieldState.error && (
                        <FormHelperText sx={{ fontWeight: 500, mx: 0 }}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
};