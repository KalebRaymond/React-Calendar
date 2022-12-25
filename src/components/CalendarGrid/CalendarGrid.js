import PropTypes from 'prop-types';
import React from 'react';
import styles from './CalendarGrid.module.scss';

import CalendarGridCard from 'components/CalendarGridCard/CalendarGridCard';
import { render } from '@testing-library/react';

const CalendarGrid = (props) => {
  const {
    calendarDates
  } = props;

  const renderDates = () => {
    console.log(calendarDates);

    return calendarDates?.map((date, i) => {
      return <CalendarGridCard key={i}></CalendarGridCard>
    });
  }

  return (
    <div className={styles.CalendarGrid} data-testid="CalendarGrid">
      {renderDates()}
    </div>
  );
}

export default CalendarGrid;
