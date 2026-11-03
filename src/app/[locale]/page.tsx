"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";

import { useAppLocale } from "@/i18n/use-locale";
import { useAppTranslation } from "@/i18n/use-translation";
import { FormCheckbox } from "@/shared/form/components/inputs/FormCheckbox";
import { FormCountrySelect } from "@/shared/form/components/inputs/FormCountrySelect";
import { FormPasswordField } from "@/shared/form/components/inputs/FormPasswordField";
import { FormPhoneInput } from "@/shared/form/components/inputs/FormPhoneInput";
import { FormRadioGroup } from "@/shared/form/components/inputs/FormRadioGroup";
import { FormSelectField } from "@/shared/form/components/inputs/FormSelectField";
import { FormTextField } from "@/shared/form/components/inputs/FormTextField";
import { phoneValidator } from "@/shared/form/utilities/validators";

// 1. Define Zod validation schema including Phone, Select, and Radio
const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  country: z.string().min(1, "Please select a country"),
  phone: phoneValidator(),
  role: z.string().min(1, "Please select a role"),
  gender: z.string().min(1, "Please select your gender"), // Fixed using z.string().min(1)
  terms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type FormData = z.infer<typeof schema>;

export default function Home() {
  const { toggleLanguage, dir, locale } = useAppLocale();
  const t = useAppTranslation("common");

  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  const handleToggleTheme = () => {
    setMode(isDark ? "light" : "dark");
  };

  // 2. Initialize react-hook-form with zod resolver
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      country: "",
      phone: "",
      role: "",
      gender: "male",
      terms: false,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Submitted Successfully:", data);
    alert("Form submitted successfully! Check console for data.");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }} dir={dir}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Stack spacing={4}>

          {/* Header Section */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t("hello")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("welcome")}
            </Typography>
          </Box>

          {/* Controls: Language & Theme */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleLanguage}
            >
              {locale === 'ar' ? 'Switch to English' : 'التحويل للعربية'}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleToggleTheme}
            >
              {mode === 'dark' ? 'الوضع الفاتح (Light)' : 'الوضع الداكن (Dark)'}
            </Button>
          </Box>

          <hr style={{ borderColor: 'rgba(0,0,0,0.1)', borderStyle: 'solid', borderWidth: '0.5px' }} />

          {/* Form Section */}
          <Typography variant="h6" sx={{ mb: -2 }}>
            {locale === 'ar' ? 'اختبار نموذج البيانات (Form & Validation Test)' : 'Form & Validation Test'}
          </Typography>

          {/* Wrap everything with FormProvider */}
          <FormProvider {...methods}>
            <Box component="form" onSubmit={methods.handleSubmit(onSubmit)} noValidate>
              <Stack spacing={3}>

                {/* 1. Full Name Field */}
                <FormTextField
                  name="fullName"
                  label={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  placeholder={locale === 'ar' ? 'أدخل اسمك هنا...' : 'Enter your name...'}
                  required
                />

                {/* 2. Email Field */}
                <FormTextField
                  name="email"
                  type="email"
                  label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  placeholder="example@domain.com"
                  required
                />

                {/* 3. Password Field */}
                <FormPasswordField
                  name="password"
                  label={locale === 'ar' ? 'كلمة المرور' : 'Password'}
                  placeholder="••••••••"
                  required
                />

                {/* 4. Phone Number Field (mui-tel-input) */}
                <FormPhoneInput
                  name="phone"
                  label={locale === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  required
                />

                {/* 5. Country Select Field */}
                <FormCountrySelect
                  name="country"
                  label={locale === 'ar' ? 'الدولة' : 'Country'}
                  required
                />

                {/* 6. Standard Select Field (Role) */}
                <FormSelectField
                  name="role"
                  label={locale === 'ar' ? 'نوع الحساب' : 'Account Role'}
                  required
                  options={[
                    { label: locale === 'ar' ? 'مطور برمجيات' : 'Developer', value: 'developer' },
                    { label: locale === 'ar' ? 'مدير نظام' : 'Admin', value: 'admin' },
                    { label: locale === 'ar' ? 'مستخدم عادي' : 'User', value: 'user' },
                  ]}
                />

                {/* 7. Radio Group Field (Gender) */}
                <FormRadioGroup
                  name="gender"
                  label={locale === 'ar' ? 'الجنس' : 'Gender'}
                  required
                  row
                  options={[
                    { label: locale === 'ar' ? 'ذكر' : 'Male', value: 'male' },
                    { label: locale === 'ar' ? 'أنثى' : 'Female', value: 'female' },
                  ]}
                />

                {/* 8. Checkbox Agreement */}
                <FormCheckbox
                  name="terms"
                  label={locale === 'ar' ? 'أوافق على الشروط والأحكام' : 'I agree to terms & conditions'}
                  required
                />

                {/* 9. Submit Button */}
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  fullWidth
                >
                  {locale === 'ar' ? 'إرسال البيانات' : 'Submit Data'}
                </Button>
              </Stack>
            </Box>
          </FormProvider>

          {/* Status Bar */}
          <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.disabled' }}>
            Current Locale: {locale.toUpperCase()} | Direction: {dir.toUpperCase()} | Mode: {mode?.toUpperCase()}
          </Typography>

        </Stack>
      </Paper>
    </Container>
  );
}