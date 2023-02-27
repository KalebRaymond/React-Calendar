import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

//Initialize focused date to today's date
const focusedDate = moment();

export const calendarReducer = createSlice({
	name: "calendar",
	initialState: {
		focusedDate: focusedDate.format("YYYY-MM-DD"),
		visibleDates: [],
		loadingEvents: "idle",
		events: {},
	},
	reducers: {
		incrementMonth: (state) => {
			const momentObj = moment(state.focusedDate);
			momentObj.add(1, "months");
			state.focusedDate = momentObj.format("YYYY-MM-DD");
		},
		decrementMonth: (state) => {
			const momentObj = moment(state.focusedDate);
			momentObj.subtract(1, "months");
			state.focusedDate = momentObj.format("YYYY-MM-DD");
		},
		loadEvents: (state) => {
			state.loadingEvents = "loading";
		},
		loadEventsSuccess: (state, action) => {
			state.loadingEvents = "idle";
			console.log("### Events loaded successfully", { events: action.payload });
			state.events = action.payload;
		},
		loadEventsFailure: (state, action) => {
			state.loadingEvents = "idle";
			console.error("Events failed to fetch.", action.payload);
		},
		createEventSuccess: (state, action) => {
			console.log("### Event created successfully", action.payload);
		},
		createEventFailure: (state, action) => {
			console.error("### Events failed to create", action.payload);
		},
		setVisibleDates: (state, action) => {
			state.visibleDates = action.payload;
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
	const test = {
		description: "",
		endDate: "2023-03-18",
		endTime: "",
		eventName: "TEST",
		frequency: "",
		location: "",
		startDate: "2023-03-14",
		startTime: "TEST",
	};
	axios
		.post("http://localhost:8080/events", test, {
			headers: { "Content-Type": "application/json" },
		})
		.then((response) => {
			dispatch(createEventSuccess(response.data));
		})
		.catch((error) => {
			dispatch(createEventFailure(error));
		});
};

export default calendarReducer.reducer;
