import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MultipleDateEvent from './MultipleDateEvent';

describe('<MultipleDateEvent />', () => {
  test('it should mount', () => {
    render(<MultipleDateEvent />);
    
    const multipleDateEvent = screen.getByTestId('MultipleDateEvent');

    expect(multipleDateEvent).toBeInTheDocument();
  });
});