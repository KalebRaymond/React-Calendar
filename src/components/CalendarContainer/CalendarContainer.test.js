import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import CalendarContainer from "./CalendarContainer";
import React from "react";
import store from "../../app/store.js";

describe("<CalendarContainer />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<CalendarContainer />
			</Provider>
		);

		const calendarContainer = screen.getByTestId("CalendarContainer");

		expect(calendarContainer).toBeInTheDocument();
	});
});
