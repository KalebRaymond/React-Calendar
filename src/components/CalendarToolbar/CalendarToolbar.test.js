import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import calendarReducer from "../../reducers/calendarReducer.js";
import CalendarToolbar from "./CalendarToolbar";
import React from "react";
import { ThemeProvider } from "context/ThemeContext.js";
import i18n from "i18n";

let store;

const createTestStore = (focusedDate) => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
		preloadedState: {
			calendar: {
				focusedDate: focusedDate,
			},
		},
	});
};

describe("<CalendarToolbar />", () => {
	beforeEach(() => {
		store = createTestStore("2021-01-01");
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
	it("should display previous month when left nav button is clicked", async () => {
		store = createTestStore("2023-02-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const leftNavButton = container.querySelector("#leftNavButton");
		fireEvent.click(leftNavButton);

		expect(await screen.getByText("January 2023")).toBeVisible();
	});
	it("should display next month when right nav button is clicked", async () => {
		store = createTestStore("2023-02-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const rightNavButton = container.querySelector("#rightNavButton");
		fireEvent.click(rightNavButton);

		expect(await screen.getByText("March 2023")).toBeVisible();
	});
	it("should display previous month and year when left nav button is clicked on January", async () => {
		store = createTestStore("2023-01-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const leftNavButton = container.querySelector("#leftNavButton");
		fireEvent.click(leftNavButton);

		expect(await screen.getByText("December 2022")).toBeVisible();
	});
	it("should display next month and year when right nav button is clicked on December", async () => {
		store = createTestStore("2023-12-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarToolbar />
				</ThemeProvider>
			</Provider>
		);

		const rightNavButton = container.querySelector("#rightNavButton");
		fireEvent.click(rightNavButton);

		expect(await screen.getByText("January 2024")).toBeVisible();
	});
});
