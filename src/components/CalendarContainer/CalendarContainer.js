import PropTypes from 'prop-types';
import React from 'react';
import styles from './CalendarContainer.module.scss';

import CalendarGrid from 'components/CalendarGrid/CalendarGrid';
import CalendarToolbar from 'components/CalendarToolbar/CalendarToolbar';

const CalendarContainer = () => (
  <div className={styles.CalendarContainer} data-testid="CalendarContainer">
    <CalendarToolbar></CalendarToolbar>
    <CalendarGrid></CalendarGrid>
  </div>
);

CalendarContainer.propTypes = {};

CalendarContainer.defaultProps = {};

export default CalendarContainer;