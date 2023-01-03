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
  it('should render month and year', async () =>{
    const monthName = 'TESTMONTH';
    const year = 'TESTYEAR';

    render(<CalendarToolbar currentMonth={monthName} currentYear={year}/>);

    const monthYear = `${monthName} ${year}`

    expect(await screen.findByText(monthYear)).toBeVisible();
  });
  it('should render two buttons for navigating months', () => {
    const {container} = render(<CalendarToolbar />);

    const buttons = container.getElementsByTagName('button');

    expect(buttons.length).toBe(2);
  });
  it('should display the previous month when the left nav button is clicked', () => {
    expect(1).toBe(2);
  });

  it('should display the next month when the right nav button is clicked', () => {
    expect(1).toBe(2);
  });
});