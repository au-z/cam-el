// const CssHmr = require("rollup-plugin-css-hmr");

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/web-components',
  core: {
    builder: '@storybook/builder-vite',
  },
  async viteFinal(config) {
    // config.plugins = [...config.plugins, CssHmr(".ts")];
    config.server.port = 9001;
    config.server.hmr = {
      protocol: "ws",
    };

    return config;
  },
};
