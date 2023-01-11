import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarGridCard.module.scss";

const CalendarGridCard = () => (
	<div className={styles.CalendarGridCard} data-testid="CalendarGridCard">
		<div className="dateContainer" id="date-container">
			<span className="date">1</span>
		</div>
		<div id="card-body">Events go here</div>
	</div>
);

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
