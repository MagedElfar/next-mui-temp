import { z } from "zod";

import { emailValidator } from "@/shared/form/utilities/validators";

/** Step 1 of the onboarding wizard: the account holder's personal details. */
export const LoginSchema = (t: any) =>
    z
        .object({
            email: emailValidator(t("login.validation.email.invalid")),
            password: z
                .string()
                .nonempty(t("login.validation.password.required"))
        })

export type LoginValues = z.infer<
    ReturnType<typeof LoginSchema>
>;
