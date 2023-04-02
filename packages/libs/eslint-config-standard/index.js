module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:import/typescript'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  plugins: ['prettier', '@typescript-eslint', 'simple-import-sort'],
  rules: {
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': 'error',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-return-await': 'off',
    'prettier/prettier': 'error',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-empty-function': 'off'
  },
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        '@typescript-eslint/no-floating-promises': 'error'
      }
    }
  ],
  ignorePatterns: ['dist', 'node_modules'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: true
    }
  }
};
