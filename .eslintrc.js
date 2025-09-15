
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022, 
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.ts', '.json'],
      },
    },
  },
  env: {
    browser: false,
    amd: false,     
    node: true,     
    es2022: true,   
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:node/recommended', 
  ],
  plugins: [
    'simple-import-sort', 
    'prettier',
    '@typescript-eslint',
  ],
  rules: {
    'prefer-const': 'error', 
    'no-console': 'warn',    
    'no-unused-vars': 'off', 
    
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_' 
    }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'warn',
    '@typescript-eslint/ban-ts-comment': 'warn',
    
    'node/no-unsupported-features/es-syntax': 'off',
    'node/no-missing-import': 'off', 
    'node/no-unpublished-import': 'off',
    'node/no-unpublished-require': 'off',
    'node/shebang': 'off',
    
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    
    'no-process-exit': 'error',
    'no-sync': 'warn',
  },
  overrides: [
    {
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts'],
      env: {
        jest: true,
      },
    },
  ],
};