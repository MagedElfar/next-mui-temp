export interface AutocompleteOptions<K = any> {
    label: string;
    value: string;
    image?: string | null;
    data: K;
}