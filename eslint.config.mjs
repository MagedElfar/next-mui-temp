import js from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginNext from "@next/eslint-plugin-next";
import pluginImport from "eslint-plugin-import";
import configPrettier from "eslint-config-prettier";
import { fixupPluginRules } from "@eslint/compat";

export default tseslint.config(
    // 1. الملفات المستثناة
    {
        ignores: [
            "**/next-env.d.ts",
            ".next/**",
            "node_modules/**",
            "dist/**",
            "out/**",
            "build/**"
        ],
    },

    // 2. القواعد العامة
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. إعدادات React و Next.js و Hooks
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "react": fixupPluginRules(pluginReact),
            "react-hooks": fixupPluginRules(pluginReactHooks),
            "@next/next": fixupPluginRules(pluginNext),
            "import": fixupPluginRules(pluginImport),
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        settings: {
            react: {
                version: "detect",
            },
            // 👈 إضافة لضبط الـ Import Resolver عشان يفهم مجلدات الـ TypeScript والـ Path Aliases
            "import/resolver": {
                typescript: {
                    alwaysTryTypes: true,
                },
                node: {
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                },
            },
        },
        rules: {
            // قواعد الـ Hooks
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",

            // قواعد Next.js
            ...pluginNext.configs.recommended.rules,
            ...pluginNext.configs["core-web-vitals"].rules,

            // قواعد React الحديثة
            "react/react-in-jsx-scope": "off", // مش محتاجين import React في كل ملف
            "react/prop-types": "off",          // طالما شغالين TypeScript فالـ Types مكفية

            // المتغيرات المهملة
            "@typescript-eslint/no-unused-vars": [
                "warn",
                {
                    "argsIgnorePattern": "^_",
                    "varsIgnorePattern": "^_",
                    "caughtErrorsIgnorePattern": "^_"
                }
            ],

            "@typescript-eslint/no-explicit-any": "off",
            "no-console": "warn",
            "prefer-const": "error",

            // ترتيب الـ Imports
            "import/order": [
                "error",
                {
                    "groups": ["builtin", "external", "internal", ["parent", "sibling", "index"]],
                    "pathGroups": [{ "pattern": "@/**", "group": "internal" }],
                    "newlines-between": "always",
                    "alphabetize": { "order": "asc", "caseInsensitive": true }
                }
            ],
        },
    },

    configPrettier
);