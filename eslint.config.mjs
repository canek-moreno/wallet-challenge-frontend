import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const frameworkPackages = [
  "react",
  "react/**",
  "react-dom",
  "react-dom/**",
  "react-redux",
  "next",
  "next/**",
  "@reduxjs/toolkit",
  "@reduxjs/toolkit/**",
];

const outerLayers = [
  "@/features/*/application/**",
  "@/features/*/infrastructure/**",
  "@/features/*/presentation/**",
  "@/store", "@/store/**",
  "@/presentation", "@/presentation/**",
  "@/container",
  "@/mock-api/**",
  "@/shared/infrastructure/**",
];

const layerRule = (group, message) => ({
  "no-restricted-imports": ["error", { patterns: [{ group, message }] }],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/features/*/domain/**/*.{ts,tsx}"],
    rules: layerRule(
      [...frameworkPackages, ...outerLayers],
      "domain no depende de frameworks ni de capas externas.",
    ),
  },
  {
    files: ["src/features/*/application/**/*.{ts,tsx}"],
    rules: layerRule(
      [...frameworkPackages, "@/features/*/infrastructure/**", "@/features/*/presentation/**", "@/store", "@/store/**", "@/presentation", "@/presentation/**", "@/container", "@/mock-api/**", "@/shared/infrastructure/**"],
      "application solo depende de domain y de puertos.",
    ),
  },
  {
    files: ["src/features/*/presentation/**/*.{ts,tsx}"],
    rules: layerRule(
      ["@/features/*/infrastructure/**", "@/mock-api/**"],
      "presentation no importa infrastructure directamente; usa container o los endpoints de RTK Query.",
    ),
  },
  {
    files: ["src/shared/**/*.{ts,tsx}"],
    rules: layerRule(
      ["@/features/**", "@/store", "@/store/**", "@/presentation", "@/presentation/**", "@/container", "@/mock-api/**"],
      "shared no conoce features ni capas de aplicación.",
    ),
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
