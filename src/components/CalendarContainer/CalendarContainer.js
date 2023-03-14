import { fetchEvents } from "../../reducers/calendarReducer";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CalendarGrid from "components/CalendarGrid/CalendarGrid";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";
import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import moment from "moment";
import React, { useContext, useEffect } from "react";
import styles from "./CalendarContainer.scss";
import TranslationService from "services/TranslationService";
import { ThemeContext } from "context/ThemeContext";

///What is the point of this component? Delete it?
const CalendarContainer = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);

	///Make these two hooks into a custom hook?
	//Keep track of first and last visible dates when the focused date changes
	const [firstVisibleDate, lastVisibleDate] = useSelector((state) => {
		return [
			state.calendar.visibleDates[0][0],
			state.calendar.visibleDates[state.calendar.visibleDates.length - 1][6],
		];
	});

	//Fetch events when the first and last visible dates change
	useEffect(() => {
		if (firstVisibleDate && lastVisibleDate) {
			dispatch(fetchEvents(firstVisibleDate, lastVisibleDate));
		}
	}, [firstVisibleDate, lastVisibleDate]);

	//Index of the month that is currently focused
	const focusedMonth = useSelector((state) =>
		moment(state.calendar.focusedDate).month()
	);
	//Year that is currently focused
	const focusedYear = useSelector((state) =>
		moment(state.calendar.focusedDate).year()
	);
	//Todays date, needed to determine if a date is today's date and display it differently
	const todaysDate = moment();

	/*	Given an object where each key maps a date to an array of objects
	 *	representing the events that start on that date, returns a nested array
	 *	that represents how the events should be displayed on the calendar.
	 *
	 * 	Returns an array containing an array for each calendar row, which contains
	 * 	objects that have a "multiDateEvents" array and a "singleDateEvents" array
	 */
	const generateEventMatrix = (events, visibleDates) => {
		//Create a matrix of empty arrays for each day of the month
		const eventMatrix = visibleDates.map((week) => {
			return week.map((_) => {
				return {
					multiDateEvents: [],
					singleDateEvents: [],
				};
			});
		});

		const curEventPositions = [];

		//Add events to the matrix in the correct position that they will
		//be displayed in the calendar. In order to make the multidate events
		//get drawn in the correct vertical position, need to put a copy of the
		//event in every day of the event's duration in the correct vertical position.
		for (let week = 0; week < eventMatrix.length; week++) {
			for (let day = 0; day < eventMatrix[week].length; day++) {
				//Get the current date string
				///Replace visibleDates with a moment().format() string TODO
				const curDate = moment()
					.set({
						date: visibleDates[week][day].date,
						month: visibleDates[week][day].month,
						year: visibleDates[week][day].year,
					})
					.format("YYYY-MM-DD");

				//Get events that start on this day
				//evens[curDate] contains all events that occur on this date,
				//including multi-day events that may start on an earlier date
				const unseenEvents = events[curDate]
					? events[curDate].filter((event) => {
							return event.startDate === curDate;
					  })
					: [];

				//Add events into first availble slot in curEventPositions
				for (let i = 0; i < unseenEvents.length; i++) {
					insertIntoFirstNullIndex(curEventPositions, unseenEvents[i]);
				}

				//Add events to the matrix
				for (let i = 0; i < curEventPositions.length; i++) {
					if (curEventPositions[i]) {
						///Ugly hack to make a deep copy of the event object
						const event = JSON.parse(JSON.stringify(curEventPositions[i]));

						//If the event is a single date event, add it to the singleDateEvents array
						if (event.numDays == 1) {
							eventMatrix[week][day].singleDateEvents.push(event);
						}
						//If the event is a multi date event, add it to the multiDateEvents array
						else {
							//If the event starts on this day or curDate is the first
							//day of the week, set isStartOfButton to true
							if (event.startDate === curDate || day === 0) {
								event.isStartOfButton = true;

								//Set buttonLength to the number of days the event lasts
								//or the number of days left in the week, whichever is smaller
								const daysLeftInWeek = 7 - day;
								const daysLeftInEvent =
									moment(event.endDate).diff(moment(curDate), "days") + 1;

								event.buttonLength = Math.min(daysLeftInWeek, daysLeftInEvent);
							}
							//If the event does not start on this day, set isStartOfButton to false
							else {
								event.isStartOfButton = false;
							}

							eventMatrix[week][day].multiDateEvents.push(event);
						}
					}
				}

				//Remove events that end on this day from curEventPositions
				///Might need to move this block down?
				for (let i = 0; i < curEventPositions.length; i++) {
					if (
						curEventPositions[i] &&
						curEventPositions[i].endDate === curDate
					) {
						curEventPositions[i] = null;
					}
				}
			}
		}

		return eventMatrix;
	};

	//Inserts a value into the first null index of an array,
	//or at the end if no indices have a null value.
	//Helper function for generateEventMatrix
	const insertIntoFirstNullIndex = (arr, val) => {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === null) {
				arr[i] = val;
				return;
			}
		}

		arr.push(val);
	};

	//2D array containing the events that should be displayed on each visible date
	const eventMatrix = useSelector((state) => {
		return generateEventMatrix(
			state.calendar.events,
			state.calendar.visibleDates
		);
	});

	///Shallow copy of dates object - performance hit?
	const renderCalendarContent = ([...dates]) => {
		let calendarContent = [];

		calendarContent = dates.map((row, i) => (
			<CalendarGridRow key={`row-${focusedMonth}-${focusedYear}-${i}`}>
				{row.map((dateObject, j) => (
					<CalendarGridCard
						cardAriaLabel={`${TranslationService.getWeekdayFromIndex(j)}, ${t(
							"dateFormats.MDY",
							{
								month: TranslationService.getMonthTranslation(dateObject.month),
								day: TranslationService.getOrdinal(dateObject.date),
								year: dateObject.year,
							}
						)}`}
						date={moment().set({
							date: dateObject.date,
							month: dateObject.month,
							year: dateObject.year,
						})}
						events={eventMatrix[i][j]}
						grayed={dateObject.month !== focusedMonth}
						isTodaysDate={
							dateObject.month === todaysDate.month() &&
							dateObject.year === todaysDate.year() &&
							dateObject.date === todaysDate.date()
						}
						key={`date-${dateObject.month}-${dateObject.date}-${dateObject.year}`}
					></CalendarGridCard>
				))}
			</CalendarGridRow>
		));

		return calendarContent;
	};

	//Render the calendar content when the state changes
	const calendarContent = useSelector((state) =>
		renderCalendarContent(state.calendar.visibleDates)
	);

	return (
		<div
			className={`CalendarContainer ${theme === "light" ? "light" : "dark"}`}
			data-testid="CalendarContainer"
		>
			<CalendarGrid>{calendarContent}</CalendarGrid>
		</div>
	);
};

export default CalendarContainer;
