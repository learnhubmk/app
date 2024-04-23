/* eslint-disable react/button-has-type */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import '@testing-library/jest-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render, fireEvent, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../app/context/themeContext'; // Adjust the import path as necessary

// Helper component to use the context
const TestComponent: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span>{theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

// eslint-disable-next-line no-undef
describe('ThemeProvider and useTheme', () => {
  // eslint-disable-next-line no-undef
  let mockGetItem: jest.Mock;
  // eslint-disable-next-line no-undef
  let mockSetItem: jest.Mock;

  // eslint-disable-next-line no-undef
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    mockGetItem = jest.fn();
    // eslint-disable-next-line no-undef
    mockSetItem = jest.fn();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
      },
      writable: true,
    });
  });

  // eslint-disable-next-line no-undef
  it('renders with default dark theme and can toggle to light', () => {
    mockGetItem.mockReturnValue('dark');
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    // eslint-disable-next-line no-undef
    expect(screen.getByText('dark')).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(document.body.className).toBe('dark');

    fireEvent.click(screen.getByText('Toggle Theme'));

    // eslint-disable-next-line no-undef
    expect(screen.getByText('light')).toBeInTheDocument();
    // eslint-disable-next-line no-undef
    expect(document.body.className).toBe('light');
    // eslint-disable-next-line no-undef
    expect(mockSetItem).toHaveBeenCalledWith('theme', 'light');
  });

  // eslint-disable-next-line no-undef
  it('uses local storage to persist theme', () => {
    mockGetItem.mockReturnValue('light');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    // eslint-disable-next-line no-undef
    expect(screen.getByText('light')).toBeInTheDocument();
  });
});
