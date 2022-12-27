import React from 'react';
import styles from './CalendarGrid.module.scss';

import CalendarGridRow from 'components/CalendarGridRow/CalendarGridRow';

const CalendarGrid = (props) => {
  const {
    calendarDates
  } = props;

  /*
  const renderDates = () => {
    console.log(calendarDates);

    return calendarDates?.map((date, i) => {
      return <CalendarGridCard key={i}></CalendarGridCard>
    });
  }
  */

  return (
    <div className={styles.CalendarGrid} data-testid="CalendarGrid">
      <CalendarGridRow></CalendarGridRow>
      <CalendarGridRow></CalendarGridRow>
      <CalendarGridRow></CalendarGridRow>
      <CalendarGridRow></CalendarGridRow>
      <CalendarGridRow></CalendarGridRow>
    </div>
  );
}

export default CalendarGrid;
