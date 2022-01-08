// do NOT change
const previewFolder = 'node_modules/.cache/storybook/public';

// create `cache` folder if not exists
require('fs').mkdirSync(previewFolder, { recursive: true });

/**
 * @typedef IStoryBookConfig
 * @prop {string[]} stories
 * @prop {string[] | { name: string }[]} addons
 * @prop {string} framework
 * @prop {string[]} staticDirs
 * @prop {{check: boolean}} typescript
 */

/** @type {IStoryBookConfig} */
const config = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    'storybook-addon-performance/register',
  ],
  framework: '@storybook/react',
  staticDirs: ['../' + previewFolder],
  typescript: {
    check: true,
  },
};

module.exports = config;
