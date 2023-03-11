import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ThemeToggleButton from './ThemeToggleButton';

describe('<ThemeToggleButton />', () => {
  test('it should mount', () => {
    render(<ThemeToggleButton />);
    
    const themeToggleButton = screen.getByTestId('ThemeToggleButton');

    expect(themeToggleButton).toBeInTheDocument();
  });
});