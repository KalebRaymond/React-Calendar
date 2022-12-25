import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarGrid from './CalendarGrid';
import CalendarGridCard from 'components/CalendarGridCard/CalendarGridCard';

describe('<CalendarGrid />', () => {
  it('should mount', () => {
    const calendarDates = [];

    render(<CalendarGrid />);
    
    const calendarGrid = screen.getByTestId('CalendarGrid');

    expect(calendarGrid).toBeInTheDocument();
  });
  it('should render 35 dates', async () => {
    const numDates = 3;
    const calendarDates = []

    for (let i = 0; i < numDates; i++) {
      calendarDates.push(i);
    }

    render(<CalendarGrid calendarDates={calendarDates} />);

    screen.debug()

    expect(await screen.findAllByTestId('CalendarGridCard')).toHaveLength(numDates);
  })
});