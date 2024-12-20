import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    rules: {
      // General Best Practices
      "no-unused-vars": "error",          // Prevent unused variables
      "no-undef": "error",                // Disallow undefined variables
      "eqeqeq": ["error", "always"],      // Enforce strict equality
      "no-console": ["warn", { allow: ["warn", "error"] }], // Warn for console logs
      "curly": ["error", "all"],          // Require braces in all control statements
      "no-eval": "error",                 // Disallow use of eval()
      "no-implied-eval": "error",         // Disallow implied eval() usage
      "no-debugger": "error",             // Disallow use of debugger

      // Code Quality
      "prefer-const": "error",            // Prefer const over let for variables that don't change
      "no-var": "error",                  // Disallow var; use let or const
      "arrow-spacing": ["error", { before: true, after: true }], // Enforce spacing in arrow functions
      "block-spacing": ["error", "always"], // Enforce spacing inside single-line blocks
      "comma-dangle": ["error", "always-multiline"], // Require trailing commas in multiline objects/arrays
      "semi": ["error", "always"],        // Require semicolons
      "quotes": ["error", "single"],      // Enforce single quotes
      "object-curly-spacing": ["error", "always"], // Enforce spaces inside curly braces

      // React Specific
      "react/react-in-jsx-scope": "off",  // Turn off if React is globally imported (e.g., in Next.js)
      "react/jsx-uses-react": "off",      // Prevent unused React imports
      "react/jsx-uses-vars": "error",     // Prevent variables used in JSX from being marked as unused
      "react/prop-types": "off",          // Disable prop-types if using TypeScript
      "react/self-closing-comp": "error", // Enforce self-closing tags for components without children

      // Additional Best Practices
      "no-multiple-empty-lines": ["error", { max: 1 }], // Restrict multiple empty lines
      "space-infix-ops": "error",          // Require spaces around operators
      "key-spacing": ["error", { beforeColon: false, afterColon: true }], // Enforce consistent spacing in object keys
      "eol-last": ["error", "always"],     // Ensure files end with a newline
      "no-trailing-spaces": "error",       // Disallow trailing spaces
    },
  },
];
