import React from "react";
import styles from "./CalendarGrid.module.scss";
import moment from "moment";
import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";

import { useSelector } from "react-redux";

const CalendarGrid = () => {
	const renderDates = () => {
		///Kind of an expensive operation?
		const focusedDateObj = moment();
		focusedDateObj.set("month", focusedMonth);
		focusedDateObj.set("year", focusedYear);

		//Get the index of the day of the week that the focused month starts on
		//ex. September 2022 starts on a Thursday -> index 4
		const firstDayOfMonthIndex = focusedDateObj.startOf("month").format("d");
		const numDaysInMonth = focusedDateObj.daysInMonth();

		//Create 2d array containing the dates to be displayed
		let rows = [];
		let curRowIndex = 0;
		//Get minimum number of days that need to be displayed on calendar, including
		//dates from previous and next months that get displayed
		const numWeeksToDisplay =
			(Number(firstDayOfMonthIndex) + Number(numDaysInMonth)) / 7;
		const numDaysToDisplay = Math.ceil(numWeeksToDisplay) * 7;
		//Get the first date that will be displayed on the calendar (if the calendar shows
		//some dates from the previous month, need to know which exact dates from that month to show)
		const prevMonthDateObj = moment();
		prevMonthDateObj.set("month", focusedMonth == 0 ? 11 : focusedMonth - 1);
		prevMonthDateObj.set(
			"year",
			focusedMonth == 0 ? focusedYear - 1 : focusedYear
		);
		let curDate = prevMonthDateObj.daysInMonth() - firstDayOfMonthIndex + 1;
		//Keep track of when the for loop is iterating over days in the previous month
		//or the current and next month
		let isPreviousMonth = true;

		for (
			let curCalendarIndex = 0;
			curCalendarIndex < numDaysToDisplay;
			++curCalendarIndex
		) {
			if (curCalendarIndex % 7 == 0) {
				//add new row and keep track of its index
				rows.push([]);
				curRowIndex = rows.length - 1;
			}

			if (curCalendarIndex == firstDayOfMonthIndex) {
				//curCalendarIndex is at the first day of the focused month
				curDate = 1;
				isPreviousMonth = false;
			}

			if (!isPreviousMonth && curDate > numDaysInMonth) {
				//curCalendarIndex is at the first day of the month after the
				//focused month
				curDate = 1;
			}

			//add date to current row
			rows[curRowIndex].push(curDate);

			curDate = curDate + 1;
		}

		const calendarContent = rows.map((row, i) => {
			return (
				<CalendarGridRow keyProp={`row-${focusedMonth}-${focusedYear}-${i}`}>
					{row.map((day, j) => {
						return (
							<CalendarGridCard
								date={day}
								keyProp={`date-${focusedMonth}-${focusedYear}-${i}-${j}`}
							></CalendarGridCard>
						);
					})}
				</CalendarGridRow>
			);
		});

		return <>{calendarContent}</>;
	};

	const focusedMonth = useSelector((state) => state.calendar.focusedMonthIndex);
	const focusedYear = useSelector((state) => state.calendar.focusedYear);

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			{renderDates()}
		</div>
	);
};

export default CalendarGrid;
