import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridCard from "./CalendarGridCard";

describe("<CalendarGridCard />", () => {
	test("it should mount", () => {
		render(<CalendarGridCard />);

		const calendarGridCard = screen.getByTestId("CalendarGridCard");

		expect(calendarGridCard).toBeInTheDocument();
	});
	it("should display date", () => {
		const date = 5;

		render(<CalendarGridCard date={date} />);

		expect(screen.getByText(date)).toBeInTheDocument();
	});
});
