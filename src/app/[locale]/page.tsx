"use client";

import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import { useState } from "react";

import { useAppLocale } from "@/i18n/use-locale";
import { useAppTranslation } from "@/i18n/use-translation";

export default function Home() {
  const { toggleLanguage, dir, locale } = useAppLocale();
  const t = useAppTranslation("common");

  const { mode, setMode } = useColorScheme();
  const isDark = mode === "dark";

  // State تجريبي للـ Inputs
  const [country, setCountry] = useState("");

  const handleToggleTheme = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 8, mb: 8 }}>
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

          {/* Form Inputs for Direction Testing */}
          <Typography variant="h6" sx={{ mb: -2 }}>
            {locale === 'ar' ? 'اختبار عناصر الإدخال (Inputs & Direction)' : 'Inputs & Direction Test'}
          </Typography>

          <Stack spacing={3}>
            {/* 1. Standard Text Field */}
            <TextField
              fullWidth
              label={locale === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              placeholder={locale === 'ar' ? 'أدخل اسمك هنا...' : 'Enter your name...'}
              variant="outlined"
            />

            {/* 2. Email Field */}
            <TextField
              fullWidth
              type="email"
              label={locale === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
              placeholder={locale === 'ar' ? 'example@domain.com' : 'example@domain.com'}
              variant="outlined"
            />

            {/* 3. Select Dropdown */}
            <FormControl fullWidth>
              <InputLabel>{locale === 'ar' ? 'الدولة' : 'Country'}</InputLabel>
              <Select
                value={country}
                label={locale === 'ar' ? 'الدولة' : 'Country'}
                onChange={(e) => setCountry(e.target.value)}
              >
                <MenuItem value="eg">{locale === 'ar' ? 'مصر' : 'Egypt'}</MenuItem>
                <MenuItem value="sa">{locale === 'ar' ? 'السعودية' : 'Saudi Arabia'}</MenuItem>
                <MenuItem value="ae">{locale === 'ar' ? 'الإمارات' : 'UAE'}</MenuItem>
              </Select>
            </FormControl>

            {/* 4. Checkbox & Switch controls */}
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{
              gap: 2
            }}>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={locale === 'ar' ? 'أوافق على الشروط والأحكام' : 'I agree to terms & conditions'}
              />
              <FormControlLabel
                control={<Switch defaultChecked />}
                label={locale === 'ar' ? 'إشعارات البريد' : 'Email Notifications'}
              />
            </Stack>

            {/* 5. Submit Button */}
            <Button variant="contained" color="success" size="large" fullWidth>
              {locale === 'ar' ? 'إرسال البيانات' : 'Submit Data'}
            </Button>
          </Stack>

          {/* Status Bar */}
          <Typography variant="caption" sx={{ textAlign: 'center', color: 'text.disabled' }}>
            Current Locale: {locale.toUpperCase()} | Direction: {dir.toUpperCase()} | Mode: {mode?.toUpperCase()}
          </Typography>

        </Stack>
      </Paper>
    </Container>
  );
}