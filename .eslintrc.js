/*
 * For reference:
 * https://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  env: {
    browser: true,
    es6: true,
    mocha: true,
  },

  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
    'plugin:promise/recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],

  globals: {},

  overrides: [
    {
      env: {
        node: true,
      },

      files: ['./.eslintrc.js'],
    },

    {
      files: ['./**/*.spec.ts', './**/*.spec.tsx', './**/specs/**/*'],

      globals: {
        expect: 'writable',
      },

      rules: {
        'react/prop-types': 'off',
      },
    },

    {
      env: {
        node: true,
      },

      files: ['./config/**/*.js', './scripts/**/*.js'],
    },
  ],

  parser: '@typescript-eslint/parser',

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },

    ecmaVersion: 2018,
    sourceType: 'module',
  },

  plugins: ['import', 'prettier', 'promise', 'mocha', 'jsx-a11y', 'react', 'react-hooks'],
  root: true,

  rules: {
    '@typescript-eslint/no-var-requires': 'off',
    'arrow-body-style': 'off',
    'eslint-comments/no-unused-disable': 'error',
    'import/extensions': ['error', 'ignorePackages', {js: 'never', ts: 'never', tsx: 'never'}],
    'import/no-extraneous-dependencies': ['error', {devDependencies: true}],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}],
    'prefer-arrow-callback': 'off',
    'prettier/prettier': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react/jsx-filename-extension': ['error', {extensions: ['.ts', '.tsx']}],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
  },

  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      typescript: {},
    },

    react: {
      version: 'detect',
    },
  },
}
