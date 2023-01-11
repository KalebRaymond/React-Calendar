import React from "react";
import styles from "./CalendarGrid.module.scss";

import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";

import { useSelector } from "react-redux";

const CalendarGrid = () => {
	/*
	const renderDates = () => {
		console.log(calendarDates);

		return calendarDates?.map((date, i) => {
			return <CalendarGridCard key={i}></CalendarGridCard>;
		});
	};
	*/

	const focusedMonth = useSelector((state) => state.calendar.focusedMonthIndex);
	const focusedYear = useSelector((state) => state.calendar.focusedYear);

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			<CalendarGridRow key={0}></CalendarGridRow>
			<CalendarGridRow key={1}></CalendarGridRow>
			<CalendarGridRow key={2}></CalendarGridRow>
			<CalendarGridRow key={3}></CalendarGridRow>
			<CalendarGridRow key={4}></CalendarGridRow>
			<CalendarGridRow key={5}></CalendarGridRow>
		</div>
	);
};

export default CalendarGrid;
