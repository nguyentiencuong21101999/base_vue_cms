module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', '@vue/airbnb'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    semi: ['error', 'never'],
    'max-len': 'off',
    'linebreak-style': 'off',
    camelcase: ['error', { properties: 'never', ignoreDestructuring: true, ignoreImports: true }],
    'arrow-parens': ['error', 'as-needed'],
    'vue/multiline-html-element-content-newline': 'off',
    'import/no-cycle': 'off',
    'global-require': 'off',
    'no-param-reassign': 'off',
    'no-return-assign': 'off',
    'consistent-return': 'off',
    'prefer-destructuring': 'off',
    'no-nested-ternary': 'off',
    'no-plusplus': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'off',
        ts: 'off',
        vue: 'off',
      },
    ],
    'no-underscore-dangle': 'off',
  },
}
