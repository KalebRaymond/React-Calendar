import React from "react";
import styles from "./CalendarGrid.module.scss";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";

const CalendarGrid = (props) => {
	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			{props.children}
		</div>
	);
};

export default CalendarGrid;
