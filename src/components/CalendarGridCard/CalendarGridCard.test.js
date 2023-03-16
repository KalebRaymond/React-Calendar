import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridCard from "./CalendarGridCard";
import { Provider } from "react-redux";
import store from "../../app/store.js";
import i18n from "i18n";
import { ThemeProvider } from "context/ThemeContext";
import moment from "moment";

let events;
let date;

describe("<CalendarGridCard />", () => {
	beforeEach(() => {
		events = {
			singleDateEvents: [],
			multiDateEvents: [],
		};
		date = moment("2021-01-01");
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} />
				</ThemeProvider>
			</Provider>
		);

		const calendarGridCard = screen.getByTestId("CalendarGridCard");

		expect(calendarGridCard).toBeInTheDocument();
	});
	it("should display the date", () => {
		date = moment("2021-01-01");

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} />
				</ThemeProvider>
			</Provider>
		);

		expect(screen.getByText("1")).toBeInTheDocument();
	});
	it("should render Create Event modal when the card body clicked", async () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} />
				</ThemeProvider>
			</Provider>
		);

		const modalButton = screen.getByRole("button", {
			"data-testid": "card-button",
		});

		fireEvent.click(modalButton);

		const modal = await screen.getByTestId("CreateEventModal");

		expect(modal).toBeInTheDocument();
	});
	it("should render Event List Container if there are events on this date", async () => {
		events = {
			singleDateEvents: [
				{
					id: "1",
					title: "Test Event",
					startDate: "2021-01-01",
					endDate: "2021-01-01",
					startTime: "12:00",
					endTime: "13:00",
				},
				{
					id: "2",
					title: "Test Event 2",
					startDate: "2021-01-01",
					endDate: "2021-01-01",
					startTime: "12:00",
					endTime: "13:00",
				},
			],
			multiDateEvents: [
				{
					id: "3",
					title: "Test Event 3",
					startDate: "2021-01-01",
					endDate: "2021-01-02",
					startTime: "12:00",
					endTime: "13:00",
				},
			],
		};

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} />
				</ThemeProvider>
			</Provider>
		);

		const eventListContainer = await screen.getByTestId("EventListContainer");
		expect(eventListContainer).toBeInTheDocument();
	});
	it("should not render Event List Container if there are no events on this date", async () => {
		events = {
			singleDateEvents: [],
			multiDateEvents: [],
		};

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} />
				</ThemeProvider>
			</Provider>
		);

		const eventListContainer = await screen.queryByTestId("EventListContainer");
		expect(eventListContainer).not.toBeInTheDocument();
	});
	it("should be rendered grayed out if props.grayed is true", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} grayed={true} />
				</ThemeProvider>
			</Provider>
		);

		const card = screen.getByTestId("CalendarGridCard");
		expect(card).toHaveClass("grayed");
	});
	it("should not be rendered grayed out if props.grayed is false", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} grayed={false} />
				</ThemeProvider>
			</Provider>
		);

		const card = screen.getByTestId("CalendarGridCard");
		expect(card).not.toHaveClass("grayed");
	});
	it("should render differently if props.isTodaysDate is true", () => {
		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} isTodaysDate={true} />
				</ThemeProvider>
			</Provider>
		);

		const dateLabel = container.querySelector("span[data-testid='card-date']");
		expect(dateLabel).toHaveClass("todaysDate");
	});
	it("should not render differently if props.isTodaysDate is false", () => {
		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CalendarGridCard events={events} date={date} isTodaysDate={false} />
				</ThemeProvider>
			</Provider>
		);

		const dateLabel = container.querySelector("span[data-testid='card-date']");
		expect(dateLabel).not.toHaveClass("todaysDate");
	});
});
