import '../styles/global.scss';
import { DecoratorFn, StoryFn } from '@storybook/react';
import { action } from '@storybook/addon-actions';

export const parameters = {
  actions: {
    onClick: action('onClick'),
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'centered',
};

export const decorators: DecoratorFn[] = [
  (Story: StoryFn) => (
    <div>
      <Story />
    </div>
  ),
];

export type StorybookTypes = {
  argTypes: {
    backgroundColor: { control: 'color' };
    size: {
      control: { type: 'select'; options: ['small', 'medium', 'large'] };
    };
    onClick: { action: 'clicked' };
  };
};
