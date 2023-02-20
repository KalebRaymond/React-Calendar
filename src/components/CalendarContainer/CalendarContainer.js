import React, { useEffect } from "react";
import styles from "./CalendarContainer.module.scss";

import CalendarGrid from "components/CalendarGrid/CalendarGrid";
import CalendarToolbar from "components/CalendarToolbar/CalendarToolbar";
import TranslationService from "services/TranslationService";
import { useSelector } from "react-redux";
import { fetchEvents } from "../../reducers/calendarReducer";
import { useDispatch } from "react-redux";
import moment from "moment";

const CalendarContainer = () => {
	//The current month and year on the calendar that is being viewed
	const focusedMonth = useSelector((state) => {
		const monthIndex = moment(state.calendar.focusedDate).month();
		return TranslationService.getMonthTranslation(monthIndex).toUpperCase();
	});
	const focusedYear = useSelector((state) => moment(state.calendar).year());

	///=========================///

	const dispatch = useDispatch();

	useEffect(() => {
		console.log("### Fetching events");
		dispatch(fetchEvents("A", "B"));
	}, [focusedMonth]);

	const events = useSelector((state) => state.calendar.events);

	useEffect(() => {
		console.log("### Success", { events });
	}, [events]);

	///=========================///

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
