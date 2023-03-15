import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { fireEvent } from "@testing-library/dom";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "context/ThemeContext";
import calendarReducer from "../../reducers/calendarReducer.js";
import i18n from "i18n";
import MultipleDateEvent from "./MultipleDateEvent";
import React from "react";

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("MultipleDateEvent Button", () => {
	beforeEach(() => {
		store = createTestStore();
	});
	test("it should mount", () => {
		const event = {
			eventName: "Test Event",
			buttonLength: 1,
			isStartOfButton: true,
		};

		render(<MultipleDateEvent event={event} />);

		const multipleDateEvent = screen.getByTestId("MultipleDateEvent");

		expect(multipleDateEvent).toBeInTheDocument();
	});
	it("Should display the event name", async () => {
		const event = {
			eventName: "Test Event",
			buttonLength: 1,
			isStartOfButton: true,
		};

		const { container } = render(
			<ThemeProvider>
				<MultipleDateEvent event={event} />
			</ThemeProvider>
		);

		const eventName = container.querySelector(".eventName");
		expect(eventName).toBeInTheDocument();
	});
	it("Should render a button with the correct length", async () => {
		const buttonLength = 3;
		const event = {
			eventName: "Test Event",
			buttonLength: buttonLength,
			isStartOfButton: true,
		};

		const { container } = render(
			<ThemeProvider>
				<MultipleDateEvent event={event} />
			</ThemeProvider>
		);

		const button = container.querySelector(".eventButton");

		expect(button.style.width).toEqual(
			`calc((100% * ${buttonLength}  - 0.15rem)`
		);
	});
	it("Should display modal when clicked", async () => {
		const event = {
			eventName: "Test Event",
			buttonLength: 1,
			isStartOfButton: true,
		};

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<MultipleDateEvent event={event} />
				</ThemeProvider>
			</Provider>
		);

		const button = container.querySelector(".eventButton");
		fireEvent.click(button);

		const modal = container.querySelector(".EditEventModal");
		expect(modal).toBeInTheDocument();
	});
});

describe("MultipleDateEvent Placeholder", () => {
	test("it should mount", () => {
		const event = {
			eventName: "Test Placeholder Event",
			buttonLength: 1,
			isStartOfButton: false,
		};

		render(<MultipleDateEvent event={event} />);

		const multipleDateEvent = screen.getByTestId("MultipleDateEvent");

		expect(multipleDateEvent).toBeInTheDocument();
	});
	it("Should not display the event name", async () => {
		const event = {
			eventName: "Test Placeholder Event",
			buttonLength: 1,
			isStartOfButton: false,
		};

		const { container } = render(
			<ThemeProvider>
				<MultipleDateEvent event={event} />
			</ThemeProvider>
		);

		const eventButton = container.querySelector(".eventButton");
		expect(eventButton.textContent).toEqual("");
	});
	it("Should display modal when clicked", async () => {
		const event = {
			eventName: "Test Placeholder Event",
			buttonLength: 1,
			isStartOfButton: false,
		};

		const { container } = render(
			<Provider store={store}>
				<ThemeProvider>
					<MultipleDateEvent event={event} />
				</ThemeProvider>
			</Provider>
		);

		const button = container.querySelector(".eventButton");
		fireEvent.click(button);

		const modal = container.querySelector(".EditEventModal");
		expect(modal).toBeInTheDocument();
	});
});
