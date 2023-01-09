import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

//Initialize focused date to today's date
const focusedDate = moment();
const focusedMonthIndex = focusedDate?.month();
const focusedYear = focusedDate?.year();

export const calendarReducer = createSlice({
	name: "calendar",
	initialState: {
		focusedMonthIndex: focusedMonthIndex,
		focusedYear: focusedYear,
	},
	reducers: {
		incrementMonth: (state) => {
			state.focusedMonthIndex = state.focusedMonthIndex + 1;

			if (state.focusedMonthIndex == 12) {
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
	},
});

// Action creators are generated for each case reducer function
export const { incrementMonth, decrementMonth } = calendarReducer.actions;

export default calendarReducer.reducer;
