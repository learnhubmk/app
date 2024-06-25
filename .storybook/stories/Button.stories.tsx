import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import Button from '../../components/reusable-components/button/Button';

interface ButtonProps {
  onClick?: () => void;
  type: string;
  buttonText?: string;
  href?: string;
  icon?: JSX.Element;
  iconSrc?: string;
  buttonClass: string[];
  rotateIcon?: boolean;
  moveIcon?: boolean;
  buttonTarget?: string;
}

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    onClick: { action: 'clicked' },
    type: {
      control: {
        type: 'select',
        options: ['button', 'link', 'cardButton', 'submit'],
      },
    },
    buttonClass: {
      control: {
        type: 'array',
      },
    },
    rotateIcon: {
      control: 'boolean',
    },
    moveIcon: {
      control: 'boolean',
    },
    buttonTarget: {
      control: {
        type: 'text',
      },
    },
  },
} as unknown as Meta<typeof Button>;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'button',
  buttonText: 'Default Button',
  buttonClass: ['defaultButton'],
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  type: 'button',
  buttonText: 'Button with Icon',
  buttonClass: ['defaultButton'],
  icon: <i className="bi bi-star"></i>,
};

export const LinkButton = Template.bind({});
LinkButton.args = {
  type: 'link',
  buttonText: 'Link Button',
  href: 'https://www.example.com',
  buttonClass: ['linkButton'],
};

export const CardButton = Template.bind({});
CardButton.args = {
  type: 'cardButton',
  buttonText: 'Card Button',
  buttonClass: ['cardButton'],
};

export const SubmitButton = Template.bind({});
SubmitButton.args = {
  type: 'submit',
  buttonText: 'Submit Button',
  buttonClass: ['submitButton'],
};
