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
  it('should render 5 weeks', async () => {
    const numWeeks = 5;
  
    render(<CalendarGrid/>);

    expect(await screen.findAllByTestId('CalendarGridRow')).toHaveLength(numWeeks);
  });
});