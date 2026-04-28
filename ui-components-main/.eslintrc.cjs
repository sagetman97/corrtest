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
}
