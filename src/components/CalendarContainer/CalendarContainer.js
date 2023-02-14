import React from "react";
import styles from "./CalendarContainer.module.scss";

import CalendarGrid from "components/CalendarGrid/CalendarGrid";
import CalendarToolbar from "components/CalendarToolbar/CalendarToolbar";
import TranslationService from "services/TranslationService";
import { useSelector } from "react-redux";

const CalendarContainer = () => {
	//The current month and year on the calendar that is being viewed
	const focusedMonth = useSelector((state) =>
		TranslationService.getMonthTranslation(
			state.calendar.focusedMonthIndex
		).toUpperCase()
	);
	const focusedYear = useSelector((state) => state.calendar.focusedYear);

	return (
		<div className={styles.CalendarContainer} data-testid="CalendarContainer">
			<CalendarToolbar
				currentMonth={focusedMonth}
				currentYear={focusedYear}
			></CalendarToolbar>
			<CalendarGrid></CalendarGrid>
		</div>
	);
};

export default CalendarContainer;
