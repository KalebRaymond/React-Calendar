import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CalendarGridCard from "./CalendarGridCard";
import { Provider } from "react-redux";
import store from "../../app/store.js";
import i18n from "i18n";

describe("<CalendarGridCard />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<CalendarGridCard />
			</Provider>
		);

		const calendarGridCard = screen.getByTestId("CalendarGridCard");

		expect(calendarGridCard).toBeInTheDocument();
	});
	it("should display date", () => {
		const date = 5;

		render(
			<Provider store={store}>
				<CalendarGridCard date={date} />
			</Provider>
		);

		expect(screen.getByText(date)).toBeInTheDocument();
	});
	it("should produce New Event modal when clicked", async () => {
		render(
			<Provider store={store}>
				<CalendarGridCard />
			</Provider>
		);

		const modalButton = screen.getByRole("region", { id: "card-body" });

		fireEvent.click(modalButton);

		const modal = await screen.getByTestId("CreateEventModal");

		expect(modal).toBeInTheDocument();
	});
	it("should close the New Event modal when the modal's close button is clicked", async () => {
		///This is the same test as above but with some added lines
		///Should improve this

		render(
			<Provider store={store}>
				<CalendarGridCard />
			</Provider>
		);

		const modalButton = screen.getByRole("region", { id: "card-body" });

		fireEvent.click(modalButton);

		const modal = await screen.getByTestId("CreateEventModal");

		expect(modal).toBeInTheDocument();

		const modalCloseButton = screen.getByRole("button", {
			name: i18n.t("event.modal.labels.closeButton"),
		});

		fireEvent.click(modalCloseButton);

		const closedModal = await screen.queryByTestId("CreateEventModal");

		expect(closedModal).toBeNull();
	});
});
