import { StorybookConfig } from '@storybook/react';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@chromatic-com/storybook',
  ],

  framework: {
    name: '@storybook/nextjs',
    options: {},
  },

  core: {},

  webpackFinal: async (config: any) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../src'),
    });
    config.resolve = {
      ...config.resolve,
      alias: {
        '@components': path.resolve(__dirname, '../src/components/'),
        '@utils': path.resolve(__dirname, '../src/utils/'),
      },
    };

    return config;
  },

  docs: {},

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};

export default config;
