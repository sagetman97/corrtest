module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    extraFileExtensions: ['.vue'],
  },
  extends: ['@pollyex'],
  ignorePatterns: ['dist/', '*eslintrc*', '*.config.*', '*.test.*'],
  overrides: [
    {
      files: ['cypress/**/*.ts'],
      rules: {
        'vue/one-component-per-file': 'off',
      },
    },
  ],
}
