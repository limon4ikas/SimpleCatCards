module.exports = {
  root: true,
  extends: [
    'universe/native',
    'plugin:@tanstack/eslint-plugin-query/recommended',
  ],
  plugins: ['react-hooks', '@tanstack/query'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // For checking hook dependencies
    '@tanstack/query/prefer-query-object-syntax': 'off',
  },
  ignorePatterns: ['pocketbase/*'],
};
