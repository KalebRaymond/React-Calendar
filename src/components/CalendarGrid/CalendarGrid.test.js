import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGrid from "./CalendarGrid";
import { Provider } from "react-redux";
import store from "../../app/store.js";

describe("<CalendarGrid />", () => {
	it("should mount", () => {
		const calendarDates = [];

		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		const calendarGrid = screen.getByTestId("CalendarGrid");

		expect(calendarGrid).toBeInTheDocument();
	});
	it("should render 6 weeks", async () => {
		///The number of weeks should ideally be 4, 5, or 6 depending
		///on the month

		const numWeeks = 6;

		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		expect(await screen.findAllByTestId("CalendarGridRow")).toHaveLength(
			numWeeks
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
