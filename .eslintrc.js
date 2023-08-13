module.exports = {
  root: true,
  extends: ['universe/native'],
  plugins: ['react-hooks'],
  rules: {
    'react-hooks/rules-of-hooks': 'error', // For checking rules of hooks
    'react-hooks/exhaustive-deps': 'warn', // For checking hook dependencies
  },
};
