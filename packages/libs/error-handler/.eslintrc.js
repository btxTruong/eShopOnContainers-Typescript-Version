module.exports = {
  root: true,
  extends: ['@eshop/eslint-config-standard'],
  parserOptions: {
    project: [`./tsconfig.json`],
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false
  }
};
