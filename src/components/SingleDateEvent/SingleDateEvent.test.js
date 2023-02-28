import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SingleDateEvent from './SingleDateEvent';

describe('<SingleDateEvent />', () => {
  test('it should mount', () => {
    render(<SingleDateEvent />);
    
    const singleDateEvent = screen.getByTestId('SingleDateEvent');

    expect(singleDateEvent).toBeInTheDocument();
  });
});