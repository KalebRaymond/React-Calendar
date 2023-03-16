import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateEventModal from "./CreateEventModal";
import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../../reducers/calendarReducer.js";
import { Provider } from "react-redux";
import { ThemeProvider } from "context/ThemeContext";
import { fireEvent } from "@testing-library/dom";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("<CreateEventModal />", () => {
	beforeEach(() => {
		store = createTestStore();
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CreateEventModal />
				</ThemeProvider>
			</Provider>
		);

		const createEventModal = screen.getByTestId("CreateEventModal");

		expect(createEventModal).toBeInTheDocument();
	});
	it("Should render the correct title", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<CreateEventModal />
				</ThemeProvider>
			</Provider>
		);

		const title = screen.getByText("eventModal.labels.createEventModal");
		expect(title).toBeInTheDocument();
	});
	it("Should call close handler when close button is clicked", async () => {
		const mockCloseFn = jest.fn();

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CreateEventModal onClose={mockCloseFn} />
				</ThemeProvider>
			</Provider>
		);

		const closeButton = await screen.getByRole("button", {
			name: "eventModal.labels.closeButton",
		});

		fireEvent.click(closeButton);

		expect(mockCloseFn).toHaveBeenCalled();
	});
	it("Should call close handler when background is clicked", async () => {
		const mockCloseFn = jest.fn();

		render(
			<Provider store={store}>
				<ThemeProvider>
					<CreateEventModal onClose={mockCloseFn} />
				</ThemeProvider>
			</Provider>
		);

		const background = await screen.getByTestId("CreateEventModal");

		fireEvent.click(background);

		expect(mockCloseFn).toHaveBeenCalled();
	});
	it("Should populate the form with the correct data", async () => {
		const mockStartDate = "2021-01-01";
		const mockEndDate = "2021-01-03";

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<CreateEventModal
						initialStartDate={mockStartDate}
						initialEndDate={mockEndDate}
					/>
				</ThemeProvider>
			</Provider>
		);

		const eventName = container.querySelector("input[id=eventName]");
		expect(eventName.value).toBe("");

		const startDate = container.querySelector("input[id=startDate]");
		expect(startDate.value).toBe(mockStartDate);

		const endDate = container.querySelector("input[id=endDate]");
		expect(endDate.value).toBe(mockEndDate);

		const startTime = container.querySelector("input[id=startTime]");
		expect(startTime.value).toBe("");

		const endTime = container.querySelector("input[id=endTime]");
		expect(endTime.value).toBe("");

		const description = container.querySelector("textarea[id=description]");
		expect(description.value).toBe("");
	});
});
