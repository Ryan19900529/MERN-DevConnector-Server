// config-overrides.js
module.exports = {
  webpack: (config) => {
    config.ignoreWarnings = [
      {
        module: /uuid/, // Ignore warnings from the uuid package
        message: /Failed to parse source map/,
      },
    ];
    return config;
  },
};
