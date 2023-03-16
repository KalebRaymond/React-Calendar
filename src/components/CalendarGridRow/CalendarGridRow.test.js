import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridRow from "./CalendarGridRow";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";
import { ThemeProvider } from "context/ThemeContext";
import moment from "moment";

describe("<CalendarGridRow />", () => {
	test("it should mount", () => {
		render(<CalendarGridRow />);

		const calendarGridRow = screen.getByTestId("CalendarGridRow");

		expect(calendarGridRow).toBeInTheDocument();
	});
	it("should render children", async () => {
		const mockEvents = {
			singleDateEvents: [],
			multiDateEvents: [],
		};

		const mockDate = moment();

		const children = (
			<>
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
				<CalendarGridCard events={mockEvents} date={mockDate} />
			</>
		);

		render(
			<ThemeProvider>
				<CalendarGridRow children={children} />
			</ThemeProvider>
		);

		expect(await screen.findAllByTestId("CalendarGridCard")).toHaveLength(7);
	});
});
