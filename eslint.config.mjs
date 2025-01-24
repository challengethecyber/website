import react from "eslint-plugin-react"
import typescriptEslint from "@typescript-eslint/eslint-plugin"
import globals from "globals"
import tsParser from "@typescript-eslint/parser"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  ...compat.extends("plugin:react/recommended", "prettier"),
  {
    plugins: {
      react,
      "@typescript-eslint": typescriptEslint,
    },

    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },

    languageOptions: {
      globals: {
        ...globals.browser,
      },

      parser: tsParser,
      ecmaVersion: 12,
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    rules: {
      "react/display-name": [
        0,
        {
          ignoreTranspilerName: false,
        },
      ],
    },
  },
  {
    files: ["**/*.tsx"],

    rules: {
      "react/prop-types": "off",
    },
  },
]
