import { configureStore } from "@reduxjs/toolkit";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { server, rest } from "./mocks/server";
import { ThemeProvider } from "context/ThemeContext";
import App from "./App";
import calendarReducer, {
	getVisibleDates,
} from "./reducers/calendarReducer.js";
import moment from "moment";
import React from "react";
import { act } from "react-dom/test-utils";

let store;

const createTestStore = (focusedDate) => {
	const momentObj = moment(focusedDate);

	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
		preloadedState: {
			calendar: {
				focusedDate: focusedDate,
				visibleDates: getVisibleDates(momentObj.month(), momentObj.year()),
				loadingEvents: "idle",
				events: {},
			},
		},
	});
};

jest.setTimeout(30000);

describe("<App />", () => {
	beforeEach(() => {
		store = createTestStore("2021-01-01");
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		expect(true);
	});
	it("should update and render the correct dates when the Next Month button is clicked", async () => {
		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const nextMonthButton = document.querySelector("#rightNavButton");
		act(() => {
			fireEvent.click(nextMonthButton);
		});

		//On April 2021, the dates March 28 - May 1 (35 days) should be displayed
		//Wait for state to update
		expect(await screen.getByText("April 2021"));

		//Check to make sure 35 dates are displayed
		const dates = document.querySelectorAll(".CalendarGridCard");
		expect(dates.length).toBe(35);

		//Check to make sure the expected dates are displayed
		const expectedDates = [
			"28",
			"29",
			"30",
			"31",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"29",
			"30",
			"1",
			"2",
		];

		dates.forEach((date, index) => {
			expect(date.textContent).toBe(expectedDates[index]);
		});
	});
	it("should update and render the correct dates when the Previous Month button is clicked", async () => {
		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const previousMonthButton = document.querySelector("#leftNavButton");
		act(() => {
			fireEvent.click(previousMonthButton);
		});

		//On February 2021, the dates January 31 - March 6 (35 days) should be displayed
		//Wait for state to update
		expect(await screen.getByText("February 2021"));

		//Check to make sure 35 dates are displayed
		const dates = document.querySelectorAll(".CalendarGridCard");
		expect(dates.length).toBe(35);

		//Check to make sure the expected dates are displayed
		const expectedDates = [
			"31",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
			"7",
			"8",
			"9",
			"10",
			"11",
			"12",
			"13",
			"14",
			"15",
			"16",
			"17",
			"18",
			"19",
			"20",
			"21",
			"22",
			"23",
			"24",
			"25",
			"26",
			"27",
			"28",
			"1",
			"2",
			"3",
			"4",
			"5",
			"6",
		];

		dates.forEach((date, index) => {
			expect(date.textContent).toBe(expectedDates[index]);
		});
	});
	it("should update and render the correct events when the Next Month button is clicked", async () => {
		//Mock server GET request
		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				const events = {
					"2021-04-14": [
						{
							eventName: "Single day event",
							startDate: "2021-04-14",
							endDate: "2021-04-14",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 1,
							id: "d/V/WcmiYKy3RkdC",
						},
					],
					"2021-04-15": [
						{
							eventName: "Multiple day event",
							startDate: "2021-04-15",
							endDate: "2021-04-16",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 2,
							id: "d/V/WcmiYKy3RkdD",
						},
					],
					"2021-04-16": [
						{
							eventName: "Multiple day event",
							startDate: "2021-04-15",
							endDate: "2021-04-16",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 2,
							id: "d/V/WcmiYKy3RkdD",
						},
					],
				};

				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const nextMonthButton = document.querySelector("#rightNavButton");

		act(() => {
			fireEvent.click(nextMonthButton);
		});

		//Wait for state to update
		expect(await screen.findByText("April 2021")).toBeInTheDocument();

		//Wait for 1 second - there must be a better way to do this
		await new Promise((r) => setTimeout(r, 1000));

		//Expect the events from the mock server to be rendered (including placeholder events)
		const events = container.querySelectorAll(".eventButton");
		expect(events.length).toBe(3);

		expect(await screen.findByText("Single day event")).toBeInTheDocument();
		expect(await screen.findByText("Multiple day event")).toBeInTheDocument();
	});
	it("should update and render the correct events when the Previous Month button is clicked", async () => {
		//Mock server GET request
		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				const events = {
					"2021-02-14": [
						{
							eventName: "Single day event",
							startDate: "2021-02-14",
							endDate: "2021-02-14",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 1,
							id: "d/V/WcmiYKy3RkdC",
						},
					],
					"2021-02-15": [
						{
							eventName: "Multiple day event",
							startDate: "2021-02-15",
							endDate: "2021-02-16",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 2,
							id: "d/V/WcmiYKy3RkdD",
						},
					],
					"2021-02-16": [
						{
							eventName: "Multiple day event",
							startDate: "2021-02-15",
							endDate: "2021-02-16",
							startTime: "",
							endTime: "",
							description: "",
							numDays: 2,
							id: "d/V/WcmiYKy3RkdD",
						},
					],
				};

				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const previousMonthButton = document.querySelector("#leftNavButton");

		act(() => {
			fireEvent.click(previousMonthButton);
		});

		//On February 2021, the dates January 31 - March 6 (35 days) should be displayed
		//Wait for state to update
		expect(await screen.findByText("February 2021")).toBeInTheDocument();

		//Wait for 1 second - there must be a better way to do this
		await new Promise((r) => setTimeout(r, 1000));

		//Expect the events from the mock server to be rendered (including placeholder events)
		const events = container.querySelectorAll(".eventButton");
		expect(events.length).toBe(3);

		expect(await screen.findByText("Single day event")).toBeInTheDocument();
		expect(await screen.findByText("Multiple day event")).toBeInTheDocument();
	});
	it("should render the new event on the calendar when a new Single Date event is created", async () => {
		//Mock server GET request
		let events = {};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				console.log("!!! get", events);
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.post("http://localhost:8080/events", (req, res, ctx) => {
				const newEvent = req.body;

				events = {
					[newEvent.startDate]: [
						{
							eventName: newEvent.eventName,
							startDate: newEvent.startDate,
							endDate: newEvent.endDate,
							startTime: newEvent.startTime,
							endTime: newEvent.endTime,
							description: newEvent.description,
							numDays: 1,
						},
					],
				};

				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const newEventButton = container.querySelectorAll(".cardButton")[0];

		act(() => {
			fireEvent.click(newEventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Create New Event")).toBeInTheDocument();

		const eventNameInput = container.querySelector("#eventName");
		const startDateInput = container.querySelector("#startDate");
		const endDateInput = container.querySelector("#endDate");
		const startTimeInput = container.querySelector("#startTime");
		const endTimeInput = container.querySelector("#endTime");
		const descriptionInput = container.querySelector("#description");
		const submitButton = container.querySelector("#submitEvent");

		act(() => {
			fireEvent.change(eventNameInput, {
				target: { value: "Single Date Event" },
			});
			fireEvent.change(startDateInput, { target: { value: "2021-03-14" } });
			fireEvent.change(endDateInput, { target: { value: "2021-03-14" } });
			fireEvent.change(startTimeInput, { target: { value: "12:00" } });
			fireEvent.change(endTimeInput, { target: { value: "13:00" } });
			fireEvent.change(descriptionInput, {
				target: { value: "Description" },
			});
			fireEvent.click(submitButton);
		});

		screen.debug(undefined, Infinity);

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the new event was rendered
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(1);
		expect(await screen.findByText("Single Date Event")).toBeInTheDocument();
	});
	it("should render the new event on the calendar when a new Multiple Date event is created", async () => {
		//Mock server GET request
		let events = {};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.post("http://localhost:8080/events", (req, res, ctx) => {
				const newEvent = req.body;

				events = {
					[newEvent.startDate]: [
						{
							eventName: newEvent.eventName,
							startDate: newEvent.startDate,
							endDate: newEvent.endDate,
							startTime: newEvent.startTime,
							endTime: newEvent.endTime,
							description: newEvent.description,
							numDays: 3,
						},
					],
				};

				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		const newEventButton = container.querySelectorAll(".cardButton")[0];

		act(() => {
			fireEvent.click(newEventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Create New Event")).toBeInTheDocument();

		const eventNameInput = container.querySelector("#eventName");
		const startDateInput = container.querySelector("#startDate");
		const endDateInput = container.querySelector("#endDate");
		const startTimeInput = container.querySelector("#startTime");
		const endTimeInput = container.querySelector("#endTime");
		const descriptionInput = container.querySelector("#description");
		const submitButton = container.querySelector("#submitEvent");

		act(() => {
			fireEvent.change(eventNameInput, {
				target: { value: "Multiple Date Event" },
			});
			fireEvent.change(startDateInput, { target: { value: "2021-03-14" } });
			fireEvent.change(endDateInput, { target: { value: "2021-03-16" } });
			fireEvent.change(startTimeInput, { target: { value: "12:00" } });
			fireEvent.change(endTimeInput, { target: { value: "13:00" } });
			fireEvent.change(descriptionInput, {
				target: { value: "Description" },
			});
			fireEvent.click(submitButton);
		});

		screen.debug(undefined, Infinity);

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the new multi date event was rendered along with placeholder events
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(3);
		expect(await screen.findByText("Multiple Date Event")).toBeInTheDocument();
	});
	it("should remove the event from the calendar when a Single Date event is deleted", async () => {
		//Mock server GET request
		let events = {
			"2021-03-14": [
				{
					eventName: "Single Day Event",
					startDate: "2021-03-14",
					endDate: "2021-03-14",
					startTime: "",
					endTime: "",
					description: "",
					numDays: 1,
					id: "d/V/WcmiYKy3RkdC",
				},
			],
		};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.delete("http://localhost:8080/events", (req, res, ctx) => {
				events = {};
				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		//Make sure the initial event gets rendered
		expect(await screen.findByText("Single Day Event")).toBeInTheDocument();

		//Click on the event to open the modal
		const eventButton = container.querySelector(".eventButton");
		act(() => {
			fireEvent.click(eventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Edit Event")).toBeInTheDocument();

		//Click on the delete button
		const deleteButton = container.querySelector("#deleteEvent");
		act(() => {
			fireEvent.click(deleteButton);
		});

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the event was removed from the calendar
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(0);
	});
	it("should remove the event from the calendar when a Multiple Date event is deleted", async () => {
		//Mock server GET request
		let events = {
			"2021-03-14": [
				{
					eventName: "Multiple Day Event",
					startDate: "2021-03-14",
					endDate: "2021-03-16",
					startTime: "",
					endTime: "",
					description: "",
					numDays: 3,
					id: "d/V/WcmiYKy3RkdC",
				},
			],
		};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.delete("http://localhost:8080/events", (req, res, ctx) => {
				events = {};
				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		//Make sure the initial event gets rendered
		expect(await screen.findByText("Multiple Day Event")).toBeInTheDocument();

		//Click on the event to open the modal
		const eventButton = container.querySelector(".eventButton");
		act(() => {
			fireEvent.click(eventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Edit Event")).toBeInTheDocument();

		//Click on the delete button
		const deleteButton = container.querySelector("#deleteEvent");
		act(() => {
			fireEvent.click(deleteButton);
		});

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the event was removed from the calendar
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(0);
	});
	it("should render the updated event on the calendar when a Single Date event is updated", async () => {
		//Mock server GET request
		let events = {
			"2021-03-14": [
				{
					eventName: "Single Date Event",
					startDate: "2021-03-14",
					endDate: "2021-03-14",
					startTime: "",
					endTime: "",
					description: "",
					numDays: 1,
					id: "d/V/WcmiYKy3RkdC",
				},
			],
		};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.put("http://localhost:8080/events", (req, res, ctx) => {
				const newEvent = req.body.updatedEvent;
				events = {
					[newEvent.startDate]: [newEvent],
				};
				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		//Make sure the initial event gets rendered
		expect(await screen.findByText("Single Date Event")).toBeInTheDocument();

		//Click on the event to open the modal
		const eventButton = container.querySelector(".eventButton");
		act(() => {
			fireEvent.click(eventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Edit Event")).toBeInTheDocument();

		//Change the name of the event
		const eventNameInput = container.querySelector("#eventName");
		act(() => {
			fireEvent.change(eventNameInput, {
				target: { value: "Updated Single Date Event" },
			});
		});

		//Click on the update button
		const updateButton = container.querySelector("#saveEvent");

		act(() => {
			fireEvent.click(updateButton);
		});

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the event was updated on the calendar
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(1);
		expect(screen.getByText("Updated Single Date Event")).toBeInTheDocument();
	});
	it("should render the updated event on the calendar when a Multiple Date event is updated", async () => {
		//Mock server GET request
		let events = {
			"2021-03-14": [
				{
					eventName: "Multiple Date Event",
					startDate: "2021-03-14",
					endDate: "2021-03-16",
					startTime: "",
					endTime: "",
					description: "",
					numDays: 3,
					id: "d/V/WcmiYKy3RkdC",
				},
			],
		};

		server.use(
			rest.get("http://localhost:8080/events", (req, res, ctx) => {
				return res(ctx.status(200), ctx.json(events));
			}),
			rest.put("http://localhost:8080/events", (req, res, ctx) => {
				const newEvent = req.body.updatedEvent;
				events = {
					[newEvent.startDate]: [newEvent],
				};
				return res(ctx.status(200), ctx.json(events));
			})
		);

		//Initialize store with March 2021 as the focused date
		store = createTestStore("2021-03-01");

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		//Make sure the initial event gets rendered
		expect(await screen.findByText("Multiple Date Event")).toBeInTheDocument();

		//Click on the event to open the modal
		const eventButton = container.querySelector(".eventButton");
		act(() => {
			fireEvent.click(eventButton);
		});

		//Wait for modal to appear
		expect(await screen.findByText("Edit Event")).toBeInTheDocument();

		//Change the name of the event
		const eventNameInput = container.querySelector("#eventName");
		act(() => {
			fireEvent.change(eventNameInput, {
				target: { value: "Updated Multiple Date Event" },
			});
		});

		//Click on the update button
		const updateButton = container.querySelector("#saveEvent");

		act(() => {
			fireEvent.click(updateButton);
		});

		//Wait for state to update
		await new Promise((r) => setTimeout(r, 1000));

		//Check that the event was updated on the calendar along with the placeholder events
		const renderedEvents = container.querySelectorAll(".eventButton");
		expect(renderedEvents.length).toBe(3);
		expect(screen.getByText("Updated Multiple Date Event")).toBeInTheDocument();
	});
});
