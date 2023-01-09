import React from "react";
import styles from "./CalendarGrid.module.scss";

import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";

const CalendarGrid = (props) => {
	const { calendarDates } = props;

	/*
  const renderDates = () => {
    console.log(calendarDates);

    return calendarDates?.map((date, i) => {
      return <CalendarGridCard key={i}></CalendarGridCard>
    });
  }
  */

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			<CalendarGridRow></CalendarGridRow>
			<CalendarGridRow></CalendarGridRow>
			<CalendarGridRow></CalendarGridRow>
			<CalendarGridRow></CalendarGridRow>
			<CalendarGridRow></CalendarGridRow>
		</div>
	);
};

export default CalendarGrid;
