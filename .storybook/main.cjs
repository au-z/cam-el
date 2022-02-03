const CssHmr = require('rollup-plugin-css-hmr');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
  ],
  framework: '@storybook/web-components',
  core: {
    builder: 'storybook-builder-vite',
  },
  async viteFinal(config) {
    config.server.port = 7777;
    config.server.hmr = {
      protocol: 'ws',
    };

    config.plugins = [CssHmr('.ts')];

    return config;
  },
};
