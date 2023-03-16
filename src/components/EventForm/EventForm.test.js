import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventForm from "./EventForm";
import { Provider } from "react-redux";
import store from "../../app/store.js";

let formState;

describe("<EventForm />", () => {
	beforeEach(() => {
		formState = {
			eventName: "Test Event",
			startDate: "2021-01-01",
			endDate: "2021-01-03",
			startTime: "12:00",
			endTime: "13:00",
			description: "This is a test event",
		};
	});
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<EventForm formState={formState} />
			</Provider>
		);

		const eventForm = screen.getByTestId("EventForm");

		expect(eventForm).toBeInTheDocument();
	});
	it("Should populate the form with values from formState", () => {
		render(
			<Provider store={store}>
				<EventForm formState={formState} />
			</Provider>
		);

		const eventName = screen.getByDisplayValue("Test Event");
		expect(eventName).toBeInTheDocument();

		const startDate = screen.getByDisplayValue("2021-01-01");
		expect(startDate).toBeInTheDocument();

		const endDate = screen.getByDisplayValue("2021-01-03");
		expect(endDate).toBeInTheDocument();

		const startTime = screen.getByDisplayValue("12:00");
		expect(startTime).toBeInTheDocument();

		const endTime = screen.getByDisplayValue("13:00");
		expect(endTime).toBeInTheDocument();

		const description = screen.getByDisplayValue("This is a test event");
		expect(description).toBeInTheDocument();
	});
	it("Should render the correct buttons", () => {
		const buttonContent = [
			{
				type: "submit",
				ariaLabel: "Submit",
				text: "Submit",
				onClick: () => {},
			},
			{
				type: "button",
				ariaLabel: "Reset",
				text: "Reset",
				onClick: () => {},
			},
		];

		render(
			<Provider store={store}>
				<EventForm formState={formState} buttonContent={buttonContent} />
			</Provider>
		);

		const submitButton = screen.getByText("Submit");
		expect(submitButton).toBeInTheDocument();

		const resetButton = screen.getByText("Reset");
		expect(resetButton).toBeInTheDocument();
	});
	it("Should call button onClick when button is clicked", () => {
		const onSubmitMock = jest.fn();
		const onResetMock = jest.fn();

		const buttonContent = [
			{
				type: "submit",
				ariaLabel: "Submit",
				text: "Submit",
				onClick: onSubmitMock,
			},
			{
				type: "button",
				ariaLabel: "Reset",
				text: "Reset",
				onClick: onResetMock,
			},
		];

		render(
			<Provider store={store}>
				<EventForm formState={formState} buttonContent={buttonContent} />
			</Provider>
		);

		const submitButton = screen.getByText("Submit");
		fireEvent.click(submitButton);
		expect(onSubmitMock).toHaveBeenCalled();

		const resetButton = screen.getByText("Reset");
		fireEvent.click(resetButton);
		expect(onResetMock).toHaveBeenCalled();
	});
});
