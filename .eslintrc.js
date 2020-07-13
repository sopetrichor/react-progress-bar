module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    plugins: ['react-hooks'],
    extends: [
      'airbnb-typescript',
      'airbnb/hooks',
      'plugin:@typescript-eslint/eslint-recommended',
      'plugin:@typescript-eslint/recommended-requiring-type-checking',
      'plugin:jest/recommended',
      'plugin:jest/style',
      'plugin:testing-library/recommended',
      'plugin:jest-dom/recommended',
      'prettier/@typescript-eslint',
      'plugin:prettier/recommended',
    ],
    parserOptions: {
      project: './tsconfig.json',
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
      'react-hooks/exhaustive-deps': 'warn', // Checks effect dependencies,
      "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
      'prettier/prettier': 'error',
    },
  };  