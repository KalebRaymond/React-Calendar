import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WeekDaysHeader from './WeekDaysHeader';

describe('<WeekDaysHeader />', () => {
  test('it should mount', () => {
    render(<WeekDaysHeader />);
    
    const weekDaysHeader = screen.getByTestId('WeekDaysHeader');

    expect(weekDaysHeader).toBeInTheDocument();
  });
  it('Should display seven days of the week', async () => {
    const numDays = 7;

    const {container} = render(<WeekDaysHeader />);
    const days = container.getElementsByClassName("weekDay");

    expect(days.length).toBe(numDays);
  })
});