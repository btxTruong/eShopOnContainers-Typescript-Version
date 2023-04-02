module.exports = {
  root: true,
  extends: ['@eshop/eslint-config-standard'],
  parserOptions: {
    project: [`${__dirname}/tsconfig.json`]
  }
};
