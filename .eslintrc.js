module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: ["@typescript-eslint", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  rules: {
    "no-console": "off",
    "no-var": "off",
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-vars": "warn",
  },
  ignorePatterns: ["node_modules/", ".env", "dist/", ".husky"],
};
