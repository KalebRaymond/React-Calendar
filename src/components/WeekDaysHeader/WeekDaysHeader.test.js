import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import WeekDaysHeader from "./WeekDaysHeader";
import i18n from "i18n"; //Required to use TranslationService

describe("<WeekDaysHeader />", () => {
	test("it should mount", () => {
		render(<WeekDaysHeader />);

		const weekDaysHeader = screen.getByTestId("WeekDaysHeader");

		expect(weekDaysHeader).toBeInTheDocument();
	});
	it("Should display seven days of the week", async () => {
		const numDays = 7;

		const { container } = render(<WeekDaysHeader />);
		const days = container.getElementsByClassName("weekDay");

		expect(days.length).toBe(numDays);
	});
	it("Should display the correct days of the week", async () => {
		const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

		const { container } = render(<WeekDaysHeader />);
		const dayLabels = container.querySelectorAll(".weekDay span");

		for (let i = 0; i < days.length; i++) {
			expect(dayLabels[i].innerHTML).toBe(days[i]);
		}
	});
});
