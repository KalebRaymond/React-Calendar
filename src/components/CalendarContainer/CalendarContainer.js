import React, { useEffect } from "react";
import styles from "./CalendarContainer.scss";
import CalendarGrid from "components/CalendarGrid/CalendarGrid";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../reducers/calendarReducer";

///What is the point of this component? Delete it?
const CalendarContainer = () => {
	const dispatch = useDispatch();

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
		<div className={"CalendarContainer"} data-testid="CalendarContainer">
			<CalendarGrid></CalendarGrid>
		</div>
	);
};

export default CalendarContainer;
