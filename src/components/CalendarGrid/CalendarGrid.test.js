import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import CalendarGrid from "./CalendarGrid";
import calendarReducer from "../../reducers/calendarReducer.js";
import React from "react";
import i18n from "i18n"; //Required because CalendarGrid uses TranslationService

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("<CalendarGrid />", () => {
	beforeEach(() => {
		store = createTestStore();
	});

	it("should mount", () => {
		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		const calendarGrid = screen.getByTestId("CalendarGrid");

		expect(calendarGrid).toBeInTheDocument();
	});
	it("should render correct number of weeks", async () => {
		//October 2022 has 6 weeks
		const octoberWeeks = 6;
		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: 9, //October is index 9 (zero indexing)
					focusedYear: 2022,
				},
			},
		});

		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		expect(await screen.findAllByTestId("CalendarGridRow")).toHaveLength(
			octoberWeeks
		);
	});
	it("should render the correct days of the month", async () => {
		///Integration test
		/* September 2022 looks like this:
		 *	SUN	MON	TUE	WED	THU	FRI	SAT
		 *	28	29	30	31	1	2	3
		 *	4	5	6	7	8	9	10
		 *	11	12	13	14	15	16	17
		 *	18	19	20	21	22	23	24
		 *	25	26	27	28	29	30	1
		 */
		const expectedDates = [
			[28, 29, 30, 31, 1, 2, 3],
			[4, 5, 6, 7, 8, 9, 10],
			[11, 12, 13, 14, 15, 16, 17],
			[18, 19, 20, 21, 22, 23, 24],
			[25, 26, 27, 28, 29, 30, 1],
		];

		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: 8, //September is index 8 (zero indexing)
					focusedYear: 2022,
				},
			},
		});

		//Render date grid
		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		//For each row in calendar (hopefully they are in order)
		const rows = await screen.findAllByTestId("CalendarGridRow");
		for (let i = 0; i < rows.length; i++) {
			//For each date card in calendar
			const daysInRow = rows[i].childNodes;
			for (let j = 0; j < daysInRow.length; j++) {
				//Make sure date on card matches expected date
				const date = daysInRow[j].querySelector("span");
				expect(date).toHaveTextContent(expectedDates[i][j]);
			}
		}
	});
});
