import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import tanstackQuery from "@tanstack/eslint-plugin-query";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    // TS/TSX만 린트
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@tanstack/query": tanstackQuery,
    },
    rules: {
      // react-hooks recommended 규칙 적용
      ...reactHooks.configs.recommended.rules,

      // react-refresh 권장 규칙 적용
      ...(reactRefresh.configs.vite?.rules ?? {}),

      // tanstack/query recommended 규칙 적용 (configs가 flat-safe가 아니면 rules만)
      ...(tanstackQuery.configs?.recommended?.rules ?? {}),
    },
  },
]);
