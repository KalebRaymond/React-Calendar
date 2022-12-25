import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarToolbar.module.scss';

const CalendarToolbar = () => (
  <div className={styles.CalendarToolbar} data-testid="CalendarToolbar">
    <span>{`[LEFT ARROW]`}</span>
    <div id="">
      <span id="month-name">TESTMONTH</span>
      <span id="year">TESTYEAR</span>
    </div>
    <span>{`[RIGHT ARROW]`}</span>
  </div>
);

CalendarToolbar.propTypes = {};

CalendarToolbar.defaultProps = {};

export default CalendarToolbar;
