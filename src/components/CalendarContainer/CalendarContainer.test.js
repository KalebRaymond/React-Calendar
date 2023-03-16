import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import CalendarContainer from "./CalendarContainer";
import React from "react";
import i18n from "i18n"; //Required because CalendarContainer uses TranslationService
import { ThemeProvider } from "context/ThemeContext";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../../reducers/calendarReducer.js";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
		///Preloaded state contains the visible dates of March 2023 and some events
		preloadedState: {
			calendar: {
				focusedDate: "2023-03-16",
				visibleDates: [
					[
						{
							month: 1,
							date: 26,
							year: 2023,
							dayOfWeek: 0,
						},
						{
							month: 1,
							date: 27,
							year: 2023,
							dayOfWeek: 1,
						},
						{
							month: 1,
							date: 28,
							year: 2023,
							dayOfWeek: 2,
						},
						{
							month: 2,
							date: 1,
							year: 2023,
							dayOfWeek: 3,
						},
						{
							month: 2,
							date: 2,
							year: 2023,
							dayOfWeek: 4,
						},
						{
							month: 2,
							date: 3,
							year: 2023,
							dayOfWeek: 5,
						},
						{
							month: 2,
							date: 4,
							year: 2023,
							dayOfWeek: 6,
						},
					],
					[
						{
							month: 2,
							date: 5,
							year: 2023,
							dayOfWeek: 0,
						},
						{
							month: 2,
							date: 6,
							year: 2023,
							dayOfWeek: 1,
						},
						{
							month: 2,
							date: 7,
							year: 2023,
							dayOfWeek: 2,
						},
						{
							month: 2,
							date: 8,
							year: 2023,
							dayOfWeek: 3,
						},
						{
							month: 2,
							date: 9,
							year: 2023,
							dayOfWeek: 4,
						},
						{
							month: 2,
							date: 10,
							year: 2023,
							dayOfWeek: 5,
						},
						{
							month: 2,
							date: 11,
							year: 2023,
							dayOfWeek: 6,
						},
					],
					[
						{
							month: 2,
							date: 12,
							year: 2023,
							dayOfWeek: 0,
						},
						{
							month: 2,
							date: 13,
							year: 2023,
							dayOfWeek: 1,
						},
						{
							month: 2,
							date: 14,
							year: 2023,
							dayOfWeek: 2,
						},
						{
							month: 2,
							date: 15,
							year: 2023,
							dayOfWeek: 3,
						},
						{
							month: 2,
							date: 16,
							year: 2023,
							dayOfWeek: 4,
						},
						{
							month: 2,
							date: 17,
							year: 2023,
							dayOfWeek: 5,
						},
						{
							month: 2,
							date: 18,
							year: 2023,
							dayOfWeek: 6,
						},
					],
					[
						{
							month: 2,
							date: 19,
							year: 2023,
							dayOfWeek: 0,
						},
						{
							month: 2,
							date: 20,
							year: 2023,
							dayOfWeek: 1,
						},
						{
							month: 2,
							date: 21,
							year: 2023,
							dayOfWeek: 2,
						},
						{
							month: 2,
							date: 22,
							year: 2023,
							dayOfWeek: 3,
						},
						{
							month: 2,
							date: 23,
							year: 2023,
							dayOfWeek: 4,
						},
						{
							month: 2,
							date: 24,
							year: 2023,
							dayOfWeek: 5,
						},
						{
							month: 2,
							date: 25,
							year: 2023,
							dayOfWeek: 6,
						},
					],
					[
						{
							month: 2,
							date: 26,
							year: 2023,
							dayOfWeek: 0,
						},
						{
							month: 2,
							date: 27,
							year: 2023,
							dayOfWeek: 1,
						},
						{
							month: 2,
							date: 28,
							year: 2023,
							dayOfWeek: 2,
						},
						{
							month: 2,
							date: 29,
							year: 2023,
							dayOfWeek: 3,
						},
						{
							month: 2,
							date: 30,
							year: 2023,
							dayOfWeek: 4,
						},
						{
							month: 2,
							date: 31,
							year: 2023,
							dayOfWeek: 5,
						},
						{
							month: 3,
							date: 1,
							year: 2023,
							dayOfWeek: 6,
						},
					],
				],
				events: {
					"2023-03-06": [
						{
							eventName: "Test",
							startDate: "2023-03-06",
							endDate: "2023-03-08",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "d/V/WcmiYKy3RkdC",
						},
					],
					"2023-03-07": [
						{
							eventName: "Test",
							startDate: "2023-03-06",
							endDate: "2023-03-08",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "d/V/WcmiYKy3RkdC",
						},
						{
							eventName: "Huh",
							startDate: "2023-03-07",
							endDate: "2023-03-09",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "yEegZrm69aESRqMv",
						},
					],
					"2023-03-08": [
						{
							eventName: "Test",
							startDate: "2023-03-06",
							endDate: "2023-03-08",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "d/V/WcmiYKy3RkdC",
						},
						{
							eventName: "Huh",
							startDate: "2023-03-07",
							endDate: "2023-03-09",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "yEegZrm69aESRqMv",
						},
					],
					"2023-03-12": [
						{
							eventName: "Test",
							startDate: "2023-03-12",
							endDate: "2023-03-12",
							startTime: "10:00",
							endTime: "",
							description: "",
							numDays: 1,
							id: "6Z1l0b7igcXV6QSP",
						},
					],
					"2023-03-13": [],
					"2023-03-14": [
						{
							eventName: "Test",
							startDate: "2023-03-14",
							endDate: "2023-03-14",
							startTime: "10:00",
							endTime: "",
							description: "",
							numDays: 1,
							id: "WsJRlagD9tuH32aA",
						},
						{
							eventName: "Test",
							startDate: "2023-03-14",
							endDate: "2023-03-14",
							startTime: "12:00",
							endTime: "",
							description: "",
							numDays: 1,
							id: "4glY/RscYCGKpiZl",
						},
					],
					"2023-03-15": [],
					"2023-03-16": [
						{
							eventName: "Midnight",
							startDate: "2023-03-16",
							endDate: "2023-03-16",
							startTime: "12:00",
							endTime: "",
							description: "",
							numDays: 1,
							id: "XibQe00H3MDMHpx+",
						},
					],
					"2023-03-17": [],
					"2023-03-18": [],
					"2023-03-19": [],
					"2023-03-20": [],
					"2023-03-21": [],
					"2023-03-22": [],
					"2023-03-23": [],
					"2023-03-09": [
						{
							eventName: "Huh",
							startDate: "2023-03-07",
							endDate: "2023-03-09",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 3,
							id: "yEegZrm69aESRqMv",
						},
					],
				},
			},
		},
	});
};

describe("<CalendarContainer />", () => {
	beforeEach(() => {
		store = createTestStore();
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarContainer />
				</ThemeProvider>
			</Provider>
		);

		const calendarContainer = screen.getByTestId("CalendarContainer");

		expect(calendarContainer).toBeInTheDocument();
	});
	it("should render 5 weeks with 7 days per week", () => {
		//March 2023 has 5 weeks

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarContainer />
				</ThemeProvider>
			</Provider>
		);

		const weeks = screen.getAllByTestId("CalendarGridRow");

		for (let i = 0; i < weeks.length; i++) {
			const days = weeks[i].getElementsByClassName("CalendarGridCard");
			expect(days.length).toBe(7);
		}

		expect(weeks.length).toBe(5);
	});
	it("should render events correctly", () => {
		/* Based on the preloaded state, there should be the following events:
		 *	- A 3 day event that starts on 3/6 and ends on 3/8
		 *	- A 3 day event that starts on 3/7 and ends on 3/9
		 *	- A single day event that starts on 3/12 at 10:00
		 *	- A single day event that starts on 3/14 at 10:00
		 *	- A single day event that starts on 3/14 at 12:00
		 *	- A single day event that starts on 3/16 at 12:00
		 *
		 * There should be 10 event buttons total, including invisible placeholders
		 */

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarContainer />
				</ThemeProvider>
			</Provider>
		);

		const events = container.querySelectorAll(".eventButton");
		expect(events.length).toBe(10);
		expect(screen.getByTestId("CalendarContainer")).toMatchSnapshot();
	});
	it("should render days in the previous and next months as grayed out", () => {
		/* On March 2023, the days February 27, 28, and 29 and April 1
		 * are displayed and should be grayed out
		 */

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarContainer />
				</ThemeProvider>
			</Provider>
		);

		const days = screen.getAllByTestId("CalendarGridCard");

		//Days in the previous month should be grayed out
		expect(days[0].getAttribute("class")).toContain("grayed");
		expect(days[1].getAttribute("class")).toContain("grayed");
		expect(days[2].getAttribute("class")).toContain("grayed");
		expect(days[3].getAttribute("class")).not.toContain("grayed");

		//Days in the next month should be grayed out
		expect(days[days.length - 1].getAttribute("class")).toContain("grayed");
		expect(days[days.length - 2].getAttribute("class")).not.toContain("grayed");
	});
});
