import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarGrid from './CalendarGrid';

describe('<CalendarGrid />', () => {
  test('it should mount', () => {
    render(<CalendarGrid />);
    
    const calendarGrid = screen.getByTestId('CalendarGrid');

    expect(calendarGrid).toBeInTheDocument();
  });
});