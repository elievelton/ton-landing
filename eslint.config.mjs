import { FlatCompat } from "@eslint/eslintrc"

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
  ),

  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",

      // Arquivos usados apenas na investigação da Ton
      "chunk-*.js",
      "ton-plancard-fees.js",
      "ton-modal-plan-details.js",
      "ton-response-*.txt",
      "ton-debug.txt",
      "ton-inspection.txt",
      "ton-test.png",
      "ton-api-capture.png",
    ],
  },
]

export default eslintConfig