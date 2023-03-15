import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider } from "context/ThemeContext";
import calendarReducer from "../../reducers/calendarReducer.js";
import i18n from "i18n";
import React from "react";
import SingleDateEvent from "./SingleDateEvent";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("<SingleDateEvent />", () => {
	beforeEach(() => {
		store = createTestStore();
	});
	test("it should mount", () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "12:00",
		};

		render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const singleDateEvent = screen.getByTestId("SingleDateEvent");

		expect(singleDateEvent).toBeInTheDocument();
	});
	it("Should display bullet point", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "12:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const bullet = container.querySelector(".bullet");
		expect(bullet).toBeInTheDocument();
	});
	it("Should display 12:00am correctly", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "0:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const time = container.querySelector(".eventTime");
		expect(time).toHaveTextContent("12:00am");
	});
	it("Should display 6:00am correctly", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "6:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const time = container.querySelector(".eventTime");
		expect(time).toHaveTextContent("6:00am");
	});
	it("Should display 12:00pm correctly", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "12:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const time = container.querySelector(".eventTime");
		expect(time).toHaveTextContent("12:00pm");
	});
	it("Should display 6:00pm correctly", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "18:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const time = container.querySelector(".eventTime");
		expect(time).toHaveTextContent("6:00pm");
	});
	it("Should display the event name", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "18:00",
		};

		const { container } = render(
			<ThemeProvider>
				<SingleDateEvent event={event} />
			</ThemeProvider>
		);

		const eventName = container.querySelector(".eventName");
		expect(eventName).toHaveTextContent("Test Event");
	});
	it("Should display modal when clicked", async () => {
		const event = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			startTime: "18:00",
		};

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<SingleDateEvent event={event} />
				</ThemeProvider>
			</Provider>
		);

		const singleDateEvent = container.querySelector(".SingleDateEvent");
		fireEvent.click(singleDateEvent);

		const modal = container.querySelector(".EditEventModal");
		expect(modal).toBeInTheDocument();
	});
});

describe("SingleDateEvent convertTo12HourTime function ", () => {});
