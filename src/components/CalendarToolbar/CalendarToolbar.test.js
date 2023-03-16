import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarReducer from "../../reducers/calendarReducer.js";
import CalendarToolbar from "./CalendarToolbar";
import React from "react";
import { ThemeProvider } from "context/ThemeContext.js";
import i18n from "i18n";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
		preloadedState: {
			calendar: {
				focusedDate: "2021-01-01",
			},
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
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const calendarToolbar = screen.getByTestId("CalendarToolbar");

		expect(calendarToolbar).toBeInTheDocument();
	});
	it("should render website title", async () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		expect(await screen.findByText("Calendar")).toBeVisible();
	});
	it("should render month and year", async () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		expect(await screen.findByText("January 2021")).toBeVisible();
	});
	it("should render correct buttons", () => {
		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const toggleThemeButton = container.querySelector(".ThemeToggleButton");
		expect(toggleThemeButton).toBeInTheDocument();

		const leftNavButton = container.querySelector(".bi-chevron-left");
		expect(leftNavButton).toBeInTheDocument();

		const rightNavButton = container.querySelector(".bi-chevron-right");
		expect(rightNavButton).toBeInTheDocument();
	});
});
