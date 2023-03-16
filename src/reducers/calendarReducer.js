import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

/* 	Given a month and year, returns an array of objects representing
 *	the dates that are visible on the calendar for that specific month.
 *	This includes any days from the previous or next month that "spill over".
 *	Each date object contains the month index, year, date, and day of week index
 */
const getVisibleDates = (monthIndex, year) => {
	const focusedDateObj = moment();
	focusedDateObj.set("month", monthIndex);
	focusedDateObj.set("year", year);

	const daysInMonth = Number(focusedDateObj.daysInMonth());
	//Index of the day of the week of the first day of the month
	//Ex. first day of month lands on a wednesday, index is 3
	const firstDayOfMonthIndex = Number(
		focusedDateObj.startOf("month").format("d")
	);
	//Index of the day of the week of the last day of the month
	//Need to clone since endOf mutates the moment object
	const lastDayOfMonthIndex = Number(
		moment(focusedDateObj).endOf("month").format("d")
	);

	const visibleDates = [];
	let curRow = [];

	//Generate dates for previous month
	const prevMonth = moment(focusedDateObj).subtract(1, "months");
	const prevMonthIndex = prevMonth.month();
	const prevMonthYear = prevMonth.year();
	let prevMonthDate = prevMonth.daysInMonth() - firstDayOfMonthIndex + 1;
	for (let i = 0; i < firstDayOfMonthIndex; i++) {
		curRow.push({
			month: prevMonthIndex,
			date: prevMonthDate,
			year: prevMonthYear,
			dayOfWeek: i,
		});
		prevMonthDate = prevMonthDate + 1;

		if (curRow.length === 7) {
			visibleDates.push(curRow);
			curRow = [];
		}
	}

	//Generate dates for current month
	for (let i = 1; i <= daysInMonth; i++) {
		focusedDateObj.set("date", i);

		curRow.push({
			month: monthIndex,
			date: i,
			year: year,
			dayOfWeek: focusedDateObj.day(),
		});

		if (curRow.length === 7) {
			visibleDates.push(curRow);
			curRow = [];
		}
	}

	//Generate dates for next month
	const nextMonth = moment(focusedDateObj).add(1, "months");
	const nextMonthIndex = nextMonth.month();
	const nextMonthYear = nextMonth.year();
	let nextMonthDate = 1;
	for (let i = lastDayOfMonthIndex + 1; i < 7; i++) {
		curRow.push({
			month: nextMonthIndex,
			date: nextMonthDate,
			year: nextMonthYear,
			dayOfWeek: i,
		});
		nextMonthDate++;

		if (curRow.length === 7) {
			visibleDates.push(curRow);
			curRow = [];
		}
	}

	return visibleDates;
};

//Initialize focused date to today's date
const focusedDate = moment();
//Initialize visible dates to the current month's dates
const visibleDates = getVisibleDates(focusedDate.month(), focusedDate.year());

export const calendarReducer = createSlice({
	name: "calendar",
	initialState: {
		focusedDate: focusedDate.format("YYYY-MM-DD"),
		visibleDates: visibleDates,
		loadingEvents: "idle",
		events: {},
	},
	reducers: {
		incrementMonth: (state) => {
			const momentObj = moment(state.focusedDate);
			momentObj.add(1, "months");
			state.focusedDate = momentObj.format("YYYY-MM-DD");
			state.visibleDates = getVisibleDates(momentObj.month(), momentObj.year());
		},
		decrementMonth: (state) => {
			const momentObj = moment(state.focusedDate);
			momentObj.subtract(1, "months");
			state.focusedDate = momentObj.format("YYYY-MM-DD");
			state.visibleDates = getVisibleDates(momentObj.month(), momentObj.year());
		},
		loadEvents: (state) => {
			state.loadingEvents = "loading";
		},
		loadEventsSuccess: (state, action) => {
			state.loadingEvents = "idle";
			///console.log("### Load events success", { events: action.payload });
			state.events = action.payload;
		},
		loadEventsFailure: (state, action) => {
			state.loadingEvents = "idle";
			console.error("Events failed to fetch.", action.payload);
		},
		createEventSuccess: (state, action) => {
			///console.log("### Event created successfully", action.payload);
			state.events = action.payload;
		},
		createEventFailure: (state, action) => {
			console.error("### Events failed to create", action.payload);
		},
		setVisibleDates: (state, action) => {
			state.visibleDates = action.payload;
		},
		deleteEventFailure: (state, action) => {
			console.error("### Events failed to delete", action.payload);
		},
		deleteEventSuccess: (state, action) => {
			///console.log("### Event deleted successfully", action.payload);
			state.events = action.payload;
		},
		updateEventFailure: (state, action) => {
			console.error("### Events failed to update", action.payload);
		},
		updateEventSuccess: (state, action) => {
			///console.log("### Event updated successfully", action.payload);
			state.events = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	incrementMonth,
	decrementMonth,
	loadEvents,
	loadEventsFailure,
	loadEventsSuccess,
	createEventFailure,
	createEventSuccess,
	setVisibleDates,
	deleteEventFailure,
	deleteEventSuccess,
	updateEventFailure,
	updateEventSuccess,
} = calendarReducer.actions;

/* CRUD Operations */
export const fetchEvents = (startDate, endDate) => async (dispatch) => {
	dispatch(loadEvents());

	if (!startDate || !endDate) {
		dispatch(loadEventsFailure(`Undefined argument passed into fetchEvents.`));
		return;
	}

	const startDateSerial = moment()
		.set({
			date: startDate.date,
			month: startDate.month,
			year: startDate.year,
		})
		.format("YYYY-MM-DD");

	const endDateSerial = moment()
		.set({
			date: endDate.date,
			month: endDate.month,
			year: endDate.year,
		})
		.format("YYYY-MM-DD");

	///TODO: Abstract server url into env variable or whatever
	await axios
		.get("http://localhost:8080/events", {
			params: {
				startDateSerial,
				endDateSerial,
			},
		})
		.then((response) => {
			dispatch(loadEventsSuccess(response.data));
		})
		.catch((error) => {
			dispatch(loadEventsFailure(error));
		});
};

export const postEvent = (eventFormContent) => async (dispatch) => {
	axios
		.post("http://localhost:8080/events", eventFormContent, {
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => {
			dispatch(createEventSuccess(response.data));
		})
		.catch((error) => {
			dispatch(createEventFailure(error));
		});
};

export const deleteEvent = (event) => async (dispatch) => {
	axios
		.delete("http://localhost:8080/events/", {
			params: {
				event,
			},
		})
		.then((response) => {
			dispatch(deleteEventSuccess(response.data));
		})
		.catch((error) => {
			dispatch(deleteEventFailure(error));
		});
};

export const updateEvent = (oldEvent, updatedEvent) => async (dispatch) => {
	axios
		.put(
			"http://localhost:8080/events",
			{ oldEvent, updatedEvent },
			{
				headers: { "Content-Type": "application/json" },
			}
		)
		.then((response) => {
			dispatch(updateEventSuccess(response.data));
		})
		.catch((error) => {
			dispatch(updateEventFailure(error));
		});
};

export default calendarReducer.reducer;
