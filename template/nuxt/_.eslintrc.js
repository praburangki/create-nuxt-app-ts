module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'plugin:vue/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/vue',
    'prettier/@typescript-eslint',
  ],
  rules: {
    'prettier/prettier': ['error'],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};
