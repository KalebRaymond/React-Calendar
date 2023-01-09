import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridRow from "./CalendarGridRow";

describe("<CalendarGridRow />", () => {
	test("it should mount", () => {
		render(<CalendarGridRow />);

		const calendarGridRow = screen.getByTestId("CalendarGridRow");

		expect(calendarGridRow).toBeInTheDocument();
	});
	it("should render 7 days", async () => {
		const numDays = 7;

		render(<CalendarGridRow />);

		expect(await screen.findAllByTestId("CalendarGridCard")).toHaveLength(
			numDays
		);
	});
});
