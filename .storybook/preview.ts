import type { Preview } from '@storybook/react';
import '../app/styles/globals/index.scss';
import * as NextImage from 'next/image';
import { setupWorker } from 'msw/browser';
import { rest } from 'msw/lib/mockServiceWorker';
const NextImages = NextImage.default;

Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: NextImages,
});

if (typeof global.process === 'undefined') {
  const worker = setupWorker(
    rest.get('http://localhost:3000/api/hello', (req, res, ctx) => {
      return res(ctx.json({ message: 'Hello from the mock API' }));
    })
  );

  worker.start();
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
