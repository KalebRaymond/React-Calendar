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
		///This should be an integration test with CalendarContainer & CalendarToolbar tbh
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
		///This should be a unit test for the reducer, not CalendarToolbar tbh

		const startingMonth = 5;

		///What was the point of the beforeEach?
		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: startingMonth,
					focusedYear: 2000,
				},
			},
		});

		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const prevMonthBtn = container.querySelector(`button[name="prevMonth"]`);
		fireEvent.click(prevMonthBtn);

		const focusedMonthIndex = store.getState().calendar.focusedMonthIndex;

		expect(focusedMonthIndex).toBe(startingMonth - 1);
	});

	it("should display the next month when the right nav button is clicked", () => {
		///This one too

		const startingMonth = 5;

		///What was the point of the beforeEach?
		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: startingMonth,
					focusedYear: 2000,
				},
			},
		});

		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const nextMonthBtn = container.querySelector(`button[name="nextMonth"]`);
		fireEvent.click(nextMonthBtn);

		const focusedMonthIndex = store.getState().calendar.focusedMonthIndex;

		expect(focusedMonthIndex).toBe(startingMonth + 1);
	});
	it("should wrap to the previous year when the left arrow nav button is clicked and the month is January", () => {
		///This should be a unit test for the reducer, not CalendarToolbar tbh

		const startingMonth = 0;
		const startingYear = 2000;

		///What was the point of the beforeEach?
		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: startingMonth,
					focusedYear: startingYear,
				},
			},
		});

		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const prevMonthBtn = container.querySelector(`button[name="prevMonth"]`);
		fireEvent.click(prevMonthBtn);

		const focusedMonthIndex = store.getState().calendar.focusedMonthIndex;
		const focusedYear = store.getState().calendar.focusedYear;

		expect(focusedMonthIndex).toBe(11);
		expect(focusedYear).toBe(startingYear - 1);
	});
	it("should wrap to the next year when the right arrow nav button is clicked and the month is December", () => {
		///This should be a unit test for the reducer, not CalendarToolbar tbh

		const startingMonth = 11;
		const startingYear = 2000;

		///What was the point of the beforeEach?
		store = configureStore({
			reducer: {
				calendar: calendarReducer,
			},
			preloadedState: {
				calendar: {
					focusedMonthIndex: startingMonth,
					focusedYear: startingYear,
				},
			},
		});

		const { container } = render(
			<Provider store={store}>
				<CalendarToolbar />
			</Provider>
		);

		const nextMonthBtn = container.querySelector(`button[name="nextMonth"]`);
		fireEvent.click(nextMonthBtn);

		const focusedMonthIndex = store.getState().calendar.focusedMonthIndex;
		const focusedYear = store.getState().calendar.focusedYear;

		expect(focusedMonthIndex).toBe(0);
		expect(focusedYear).toBe(startingYear + 1);
	});
});
