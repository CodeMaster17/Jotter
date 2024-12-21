import js from '@eslint/js';
import globals from 'globals';
export const nodeJsConfig = [
  {
    languageOptions: {
      globals: globals.node,
    },
    files: ['**/*.js'],
    extends: [js.configs.recommended],
    rules: {
      'no-console': 'warning', // Allow console logs in Node.js
      'global-require': 'error',
      'handle-callback-err': 'error',
      'no-new-require': 'error',
      'no-path-concat': 'error',
    },
  },
];