import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridRow from "./CalendarGridRow";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";

describe("<CalendarGridRow />", () => {
	test("it should mount", () => {
		render(<CalendarGridRow />);

		const calendarGridRow = screen.getByTestId("CalendarGridRow");

		expect(calendarGridRow).toBeInTheDocument();
	});
	it("should render children", async () => {
		const children = (
			<>
				<CalendarGridCard date={1}></CalendarGridCard>
				<CalendarGridCard date={2}></CalendarGridCard>
				<CalendarGridCard date={3}></CalendarGridCard>
				<CalendarGridCard date={4}></CalendarGridCard>
				<CalendarGridCard date={5}></CalendarGridCard>
				<CalendarGridCard date={6}></CalendarGridCard>
				<CalendarGridCard date={7}></CalendarGridCard>
			</>
		);

		render(<CalendarGridRow children={children} />);

		expect(await screen.findAllByTestId("CalendarGridCard")).toHaveLength(7);
	});
});
