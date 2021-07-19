module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'airbnb-base',
    'prettier',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    es2020: true,
    es6: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-unsed-vars': 'off',
    'import/no-unresolved': 'off', // @path추가한거 안먹던 애들 해결됨
    'import/prefer-default-export': 'off', // 모듈이 하나면 무조건 export default, 모듈 둘 이상이면 각각 export 하던가 하나는 export default
    'import/order': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',
    'implicit-arror-linebreak': 'off',
    'arrow-body-style': ['error', 'as-needed'],
    'object-curly-newline': 'off',
    'no-console': 'off',
    'no-prototype-builtins': 'off',
    'new-cap': 'off',
    'prefer-promise-reject-errors': 'off',
    'no-throw-literal': 'off',
    'no-shadow': 'off',
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        printWidth: 80,
      },
    ],
    'no-use-before-define': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
    'no-useless-constructor': 'off',
    'no-plusplus': 'off',
    'no-bitwise': 'off',
    'class-methods-use-this': 'off',
    'no-unexpected-multiline': 'error',
    camelcase: 'off',
  },
  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts'],
      },
    },
  },
};
