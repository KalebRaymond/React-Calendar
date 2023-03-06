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
	const dispatch = useDispatch();
	//The current month and year on the calendar that is being viewed
	const focusedMonth = useSelector((state) => {
		const monthIndex = moment(state.calendar.focusedDate).month();
		return TranslationService.getMonthTranslation(monthIndex).toUpperCase();
	});

	const focusedYear = useSelector((state) =>
		moment(state.calendar.focusedDate).year()
	);

	///Map this out... when is visibleDates updated?
	///I think in CalendarGrid, maybe move to this component?
	const [firstVisibleDate, lastVisibleDate] = useSelector((state) => {
		return [
			state.calendar.visibleDates[0][0],
			state.calendar.visibleDates[state.calendar.visibleDates.length - 1][6],
		];
	});

	useEffect(() => {
		if (firstVisibleDate && lastVisibleDate) {
			dispatch(fetchEvents(firstVisibleDate, lastVisibleDate));
		}
	}, [firstVisibleDate, lastVisibleDate]);

	return (
		<div className={styles.CalendarContainer} data-testid="CalendarContainer">
			<CalendarToolbar
				focusedMonth={focusedMonth}
				focusedYear={focusedYear}
			></CalendarToolbar>
			<CalendarGrid></CalendarGrid>
		</div>
	);
};

export default CalendarContainer;
