import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import CalendarToolbar from "./CalendarToolbar";
import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../../reducers/calendarReducer.js";

//import store from "../../app/store.js";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("<CalendarToolbar />", () => {
	beforeEach(() => {
		store = createTestStore();
	});

	it("should mount", () => {
		render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const calendarToolbar = screen.getByTestId("CalendarToolbar");

		expect(calendarToolbar).toBeInTheDocument();
	});
	it("should render month and year", async () => {
		const monthName = 1;
		const year = 2023;

		render(
			<Provider store={store}>
				<CalendarToolbar currentMonth={monthName} currentYear={year} />
			</Provider>
		);

		const monthYear = `${monthName} ${year}`;

		expect(await screen.findByText(monthYear)).toBeVisible();
	});
	it.skip("should display the current month and current year upon page load", () => {
		const todaysDate = moment();
	});
	it("should render two buttons for navigating months", () => {
		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const buttons = container.getElementsByTagName("button");

		expect(buttons.length).toBe(2);
	});
	it("should display the previous month when the left nav button is clicked", () => {
		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const prevMonthBtn = container.querySelector(`button[name="prevMonth"]`);
		fireEvent.click(prevMonthBtn);

		expect(1).toBe(2);
	});

	it("should display the next month when the right nav button is clicked", () => {
		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const nextMonthBtn = container.querySelector(`button[name="nextMonth"]`);
		fireEvent.click(nextMonthBtn);

		expect(1).toBe(2);
	});
});
