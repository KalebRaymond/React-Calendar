import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarGridRow.module.scss";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";

const CalendarGridRow = (props) => (
	<div
		key={props.key}
		className={styles.CalendarGridRow}
		data-testid="CalendarGridRow"
	>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
		<CalendarGridCard></CalendarGridCard>
	</div>
);

CalendarGridRow.propTypes = {};

CalendarGridRow.defaultProps = {};

export default CalendarGridRow;
