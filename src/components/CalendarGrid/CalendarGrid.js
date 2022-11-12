import PropTypes from 'prop-types';
import React from 'react';
import styles from './CalendarGrid.module.scss';

import CalendarGridCard from 'components/CalendarGridCard/CalendarGridCard';

const CalendarGrid = () => (
  <div className={styles.CalendarGrid} data-testid="CalendarGrid">
    <CalendarGridCard></CalendarGridCard>
  </div>
);

CalendarGrid.propTypes = {};

CalendarGrid.defaultProps = {};

export default CalendarGrid;
