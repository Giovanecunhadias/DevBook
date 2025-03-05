import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  
});




const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-var": "off", // Desativa a regra para `var`
      "@typescript-eslint/no-explicit-any": "off", // Permite `any` temporariamente
      "@typescript-eslint/no-unused-vars": ["warn"], // Emite apenas um aviso em vez de erro
    },
  },
];




export default eslintConfig;