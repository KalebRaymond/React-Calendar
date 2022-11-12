import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarGridCard.module.scss";

const CalendarGridCard = () => (
  <div className={styles.CalendarGridCard} data-testid="CalendarGridCard">
    <div id="date-container">
      <span>1</span>
    </div>
    <div id="event-area">
      Events go here
    </div>
  </div>
);

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
