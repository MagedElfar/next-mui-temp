import { ReactNode } from "react";

import { AutocompleteOptions } from "@/types/options";

export type FORM_MODE = "create" | "edit"

export interface StepConfig {
    label: string;
    component: ReactNode;
    fields: string[];
}

export type RadioOption = {
    label: string;
    value: string | number;
};

export type OptionValue<T> = AutocompleteOptions<T> | AutocompleteOptions<T>[] | null;
