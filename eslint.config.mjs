import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),{
    plugins: ["import"],
    rules: {
      "import/no-duplicates": 2,
      "import/order": [
        error,
        {
          groups: [
            "builtin",   // Node.js built-in modules
            "external",  // External modules from npm
            "internal",  // Internal modules (e.g., alias imports)
            ["parent", "sibling", "index"], // Relative imports
            "object",
            "type",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": 2,
    }
  }
];

export default eslintConfig;
