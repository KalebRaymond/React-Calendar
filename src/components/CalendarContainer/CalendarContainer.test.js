import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarContainer from './CalendarContainer';

describe('<CalendarContainer />', () => {
  test('it should mount', () => {
    render(<CalendarContainer />);
    
    const calendarContainer = screen.getByTestId('CalendarContainer');

    expect(calendarContainer).toBeInTheDocument();
  });
});