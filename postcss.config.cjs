module.exports = () => ({
  plugins: {
    "postcss-preset-env": {
      stage: 1,
      features: {
        "custom-media-queries": {
          importFrom: ["src/postcss/custom-media.css"],
        },
      },
    },
  },
});
