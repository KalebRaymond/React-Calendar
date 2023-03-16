import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EditEventModal from "./EditEventModal";
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

describe("<EditEventModal />", () => {
	beforeEach(() => {
		store = createTestStore();
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<EditEventModal />
				</ThemeProvider>
			</Provider>
		);

		const editEventModal = screen.getByTestId("EditEventModal");

		expect(editEventModal).toBeInTheDocument();
	});
	it("Should render the correct title", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<EditEventModal />
				</ThemeProvider>
			</Provider>
		);

		const title = screen.getByText("eventModal.labels.editEventModal");
		expect(title).toBeInTheDocument();
	});
	it("Should call close handler when close button is clicked", async () => {
		const mockCloseFn = jest.fn();

		render(
			<Provider store={store}>
				<ThemeProvider>
					<EditEventModal onClose={mockCloseFn} />
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
					<EditEventModal onClose={mockCloseFn} />
				</ThemeProvider>
			</Provider>
		);

		const background = await screen.getByTestId("EditEventModal");

		fireEvent.click(background);

		expect(mockCloseFn).toHaveBeenCalled();
	});
	it("Should populate the form with the correct data", async () => {
		const mockEvent = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			endDate: "2021-01-03",
			startTime: "12:00",
			endTime: "13:00",
			description: "Test Description",
		};

		render(
			<Provider store={store}>
				<ThemeProvider>
					<EditEventModal event={mockEvent} />
				</ThemeProvider>
			</Provider>
		);

		const eventName = screen.getByDisplayValue(mockEvent.eventName);
		expect(eventName).toBeInTheDocument();

		const startDate = screen.getByDisplayValue(mockEvent.startDate);
		expect(startDate).toBeInTheDocument();

		const endDate = screen.getByDisplayValue(mockEvent.endDate);
		expect(endDate).toBeInTheDocument();

		const startTime = screen.getByDisplayValue(mockEvent.startTime);
		expect(startTime).toBeInTheDocument();

		const endTime = screen.getByDisplayValue(mockEvent.endTime);
		expect(endTime).toBeInTheDocument();

		const description = screen.getByDisplayValue(mockEvent.description);
		expect(description).toBeInTheDocument();
	});
});
