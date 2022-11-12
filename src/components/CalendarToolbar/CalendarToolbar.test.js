import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarToolbar from './CalendarToolbar';

describe('<CalendarToolbar />', () => {
  test('it should mount', () => {
    render(<CalendarToolbar />);
    
    const calendarToolbar = screen.getByTestId('CalendarToolbar');

    expect(calendarToolbar).toBeInTheDocument();
  });
});