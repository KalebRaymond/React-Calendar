import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
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
	it("should produce New Event modal when clicked", async () => {
		render(<CalendarGridCard />);

		const modalButton = screen.getByRole("region", { id: "card-body" });

		fireEvent.click(modalButton);

		const modal = await screen.getByTestId("CreateEventModal");

		expect(modal).toBeInTheDocument();
	});
	it("should close the New Event modal when the modal's close button is clicked", async () => {
		///This is the same test as above but with some added lines
		///Should improve this

		render(<CalendarGridCard />);

		const modalButton = screen.getByRole("region", { id: "card-body" });

		fireEvent.click(modalButton);

		const modal = await screen.getByTestId("CreateEventModal");

		expect(modal).toBeInTheDocument();

		const modalCloseButton = screen.getByRole("button", { id: "close-button" });

		fireEvent.click(modalCloseButton);

		const closedModal = await screen.queryByTestId("CreateEventModal");

		expect(closedModal).toBeNull();
	});
});
