import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";
import axios from "axios";

//Initialize focused date to today's date
const focusedDate = moment();
const focusedMonthIndex = focusedDate?.month();
const focusedYear = focusedDate?.year();

export const calendarReducer = createSlice({
	name: "calendar",
	initialState: {
		focusedMonthIndex: focusedMonthIndex,
		focusedYear: focusedYear,
		loadingEvents: "idle",
		events: [],
	},
	reducers: {
		incrementMonth: (state) => {
			state.focusedMonthIndex = state.focusedMonthIndex + 1;

			if (state.focusedMonthIndex === 12) {
				state.focusedMonthIndex = 0;
				state.focusedYear = state.focusedYear + 1;
			}
		},
		decrementMonth: (state) => {
			state.focusedMonthIndex = state.focusedMonthIndex - 1;

			if (state.focusedMonthIndex < 0) {
				state.focusedMonthIndex = 11;
				state.focusedYear = state.focusedYear - 1;
			}
		},
		loadEvents: (state) => {
			state.loadingEvents = "loading";
			console.log("### Fetching events");
		},
		loadEventsSuccess: (state, action) => {
			state.loadingEvents = "idle";
			console.log("### Events fetched successfully", action.payload);
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
export const fetchEvents = () => async (dispatch) => {
	dispatch(loadEvents());

	///TODO: Abstract server url into env variable or whatever
	///Fix CORS issue better than "withCredentials: false,"
	await axios
		.get("http://localhost:8080/events")
		.then((response) => {
			dispatch(loadEventsSuccess(response.data));
		})
		.catch((error) => {
			dispatch(loadEventsFailure(error));
		});
};

export const postEvent = (event) => async (dispatch) => {
	axios
		.post(
			"http://localhost:8080/events",
			{
				test: event,
			},
			{ headers: { "Content-Type": "application/json" } }
		)
		.then((response) => {
			dispatch(createEventSuccess(response.data));
		})
		.catch((error) => {
			dispatch(createEventFailure(error));
		});
};

export default calendarReducer.reducer;
