import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventListContainer from "./EventListContainer";
import { ThemeProvider } from "context/ThemeContext";
import i18n from "i18n";

describe("<EventListContainer />", () => {
	test("it should mount", () => {
		render(
			<ThemeProvider>
				<EventListContainer multiDateEvents={[]} singleDateEvents={[]} />
			</ThemeProvider>
		);

		const eventListContainer = screen.getByTestId("EventListContainer");

		expect(eventListContainer).toBeInTheDocument();
	});
	test("it should render Multiple-Date events", () => {
		const multiDateEvents = [
			{
				eventName: "Event 1",
				buttonLength: 2,
			},
			{
				eventName: "Event 2",
				buttonLength: 3,
			},
			{
				eventName: "Event 3",
				buttonLength: 2,
			},
		];

		const { container } = render(
			<ThemeProvider>
				<EventListContainer
					multiDateEvents={multiDateEvents}
					singleDateEvents={[]}
				/>
			</ThemeProvider>
		);

		const renderedEvents = container.querySelectorAll("button");
		expect(renderedEvents.length).toBe(multiDateEvents.length);
	});
	it("Should render Single-Date events", async () => {
		const singleDateEvents = [
			{
				eventName: "Event 4",
				startTime: "18:00",
			},
			{
				eventName: "Event 5",
				startTime: "10:30",
			},
		];

		const { container } = render(
			<ThemeProvider>
				<EventListContainer
					multiDateEvents={[]}
					singleDateEvents={singleDateEvents}
				/>
			</ThemeProvider>
		);

		const renderedEvents = container.querySelectorAll("button");
		expect(renderedEvents.length).toBe(singleDateEvents.length);
	});
	test("it should render Multiple-Date and Single-Date events together", () => {
		const multiDateEvents = [
			{
				eventName: "Event 1",
				buttonLength: 2,
			},
			{
				eventName: "Event 2",
				buttonLength: 3,
			},
			{
				eventName: "Event 3",
				buttonLength: 2,
			},
		];

		const singleDateEvents = [
			{
				eventName: "Event 4",
				startTime: "18:00",
			},
			{
				eventName: "Event 5",
				startTime: "10:30",
			},
		];

		const { container } = render(
			<ThemeProvider>
				<EventListContainer
					multiDateEvents={multiDateEvents}
					singleDateEvents={singleDateEvents}
				/>
			</ThemeProvider>
		);

		const renderedEvents = container.querySelectorAll("button");
		expect(renderedEvents.length).toBe(
			multiDateEvents.length + singleDateEvents.length
		);
	});
	it("Should render correctly when no events are provided", async () => {
		const { container } = render(
			<ThemeProvider>
				<EventListContainer multiDateEvents={[]} singleDateEvents={[]} />
			</ThemeProvider>
		);

		const renderedEvents = container.querySelectorAll("button");
		expect(renderedEvents.length).toBe(0);
	});
});
