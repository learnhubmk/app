/* eslint-disable import/no-named-as-default */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
// Home.stories.tsx
import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import { Page } from '../Page';

export default {
  title: 'Pages/Page',
  component: Page,
  parameters: {
    controls: {
      disable: true, // Disable controls as there are no props to manipulate
    },
  },
} as Meta;

export const Template: StoryFn<typeof Page> = (args) => <Page {...args} />;
/*
Template.loaders = [
  async () => {
    let data = await getServerSideProps();
    return data.props;
  },
];
*/
