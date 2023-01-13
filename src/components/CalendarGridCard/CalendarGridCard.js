import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarGridCard.module.scss";

const CalendarGridCard = (props) => (
	<div
		className={styles.CalendarGridCard}
		key={props.keyProp}
		data-testid="CalendarGridCard"
	>
		<div className="dateContainer" id="date-container">
			<span className="date">{props.date}</span>
		</div>
		<div id="card-body">Events go here</div>
	</div>
);

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
