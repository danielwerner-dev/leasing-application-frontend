module.exports = {
  plugins: ["jest"],
  env: {
    jest: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    camelcase: "off",
  },
};
