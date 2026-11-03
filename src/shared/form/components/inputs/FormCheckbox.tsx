import {
    Checkbox,
    FormControlLabel,
    FormHelperText,
    FormControl,
    type CheckboxProps,
    Box,
} from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export type FormCheckboxProps = CheckboxProps & {
    name: string;
    label: React.ReactNode;
    required?: boolean;
};

export function FormCheckbox({
    name,
    label,
    required,
    ...props
}: FormCheckboxProps) {
    // Access the form context provided by react-hook-form
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={false}
            render={({ field, fieldState }) => (
                <FormControl
                    error={!!fieldState.error}
                    component="fieldset"
                    variant="standard"
                    sx={{ width: '100%' }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                {...field}
                                {...props}
                                // Ensure checked status reflects boolean value safely
                                checked={!!field.value}
                            />
                        }
                        label={
                            <span>
                                {label}
                                {required && (
                                    <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                                        *
                                    </Box>
                                )}
                            </span>
                        }
                    />

                    {/* Display validation error message if present */}
                    {fieldState.error && (
                        <FormHelperText error sx={{ mx: 0, fontWeight: 500 }}>
                            {fieldState.error.message}
                        </FormHelperText>
                    )}
                </FormControl>
            )}
        />
    );
}