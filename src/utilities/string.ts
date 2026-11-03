export const normalizePhoneValue = (value: string) => {
    const trimmed = value.trim().replace(/\s+/g, "");

    if (!trimmed) return "";

    const countryCodeOnly = /^(?:\+|00)?\d{1,3}$/.test(trimmed);
    if (countryCodeOnly) return "";

    return trimmed;
};