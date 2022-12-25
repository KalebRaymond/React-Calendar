import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CalendarToolbar from './CalendarToolbar';

describe('<CalendarToolbar />', () => {
  it('should mount', () => {
    render(<CalendarToolbar />);
    
    const calendarToolbar = screen.getByTestId('CalendarToolbar');

    expect(calendarToolbar).toBeInTheDocument();
  });
  it('should render month name', async () =>{
    render(<CalendarToolbar />);
    const monthName = 'TESTMONTH';

    expect(await screen.findByText(monthName)).toBeVisible();
  });
  it('should render year', async () =>{
    render(<CalendarToolbar />);
    const year = 'TESTYEAR';

    expect(await screen.findByText(year)).toBeVisible();
  });
});