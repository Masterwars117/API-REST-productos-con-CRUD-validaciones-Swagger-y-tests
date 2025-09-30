module.exports = {
  env: { node: true, es2021: true, jest: true },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'script' },
  rules: {
    'prettier/prettier': ['error', { singleQuote: true, semi: true }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
};
