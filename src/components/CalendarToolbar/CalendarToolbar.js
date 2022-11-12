import React from 'react';
import PropTypes from 'prop-types';
import styles from './CalendarToolbar.module.scss';

const CalendarToolbar = () => (
  <div className={styles.CalendarToolbar} data-testid="CalendarToolbar">
    CalendarToolbar Component
  </div>
);

CalendarToolbar.propTypes = {};

CalendarToolbar.defaultProps = {};

export default CalendarToolbar;
