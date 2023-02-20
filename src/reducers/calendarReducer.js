import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

//Initialize focused date to today's date
const focusedDate = moment();

export const calendarReducer = createSlice({
	name: "calendar",
	initialState: {
		focusedDate: focusedDate.format(),
		visibleDates: [],
		loadingEvents: "idle",
		events: [],
	},
	reducers: {
		incrementMonth: (state) => {
			const momentObj = state.focusedMonth;
			momentObj.add(1, "months");
			state.focusedDate = momentObj.format();
		},
		decrementMonth: (state) => {
			const momentObj = state.focusedMonth;
			momentObj.subtract(1, "months");
			state.focusedDate = momentObj.format();
		},
		loadEvents: (state) => {
			state.loadingEvents = "loading";
		},
		loadEventsSuccess: (state, action) => {
			state.loadingEvents = "idle";
			state.events = action.payload;
		},
		loadEventsFailure: (state, action) => {
			state.loadingEvents = "idle";
			console.error("### Events failed to fetch", action.payload);
		},
		createEventSuccess: (state, action) => {
			console.log("### Event created successfully", action.payload);
		},
		createEventFailure: (state, action) => {
			console.error("### Events failed to create", action.payload);
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
} = calendarReducer.actions;

/* CRUD Operations */
export const fetchEvents = (startDate, endDate) => async (dispatch) => {
	dispatch(loadEvents());

	///TODO: Abstract server url into env variable or whatever
	await axios
		.get("http://localhost:8080/events", {
			params: {
				startDate,
				endDate,
			},
		})
		.then((response) => {
			dispatch(loadEventsSuccess(response.data));
		})
		.catch((error) => {
			dispatch(loadEventsFailure(error));
		});
};

export const postEvent = (event) => async (dispatch) => {
	axios
		.post("http://localhost:8080/events", event, {
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
