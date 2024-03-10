import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MyComponent from './MyComponent'; 

test('renders MyComponent with correct text', () => {
  render(<MyComponent />);
  const textElement = screen.getByText(/Hello, World!/i);
  expect(textElement).toBeInTheDocument();
});