import "@testing-library/jest-dom/extend-expect";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";
import CalendarGrid from "./CalendarGrid";
import calendarReducer from "../../reducers/calendarReducer.js";
import React from "react";
import i18n from "i18n"; //Required because CalendarGrid uses TranslationService

let store;

const createTestStore = () => {
	return configureStore({
		reducer: {
			calendar: calendarReducer,
		},
	});
};

describe("<CalendarGrid />", () => {
	beforeEach(() => {
		store = createTestStore();
	});

	it("should mount", () => {
		render(
			<Provider store={store}>
				<CalendarGrid />
			</Provider>
		);

		const calendarGrid = screen.getByTestId("CalendarGrid");

		expect(calendarGrid).toBeInTheDocument();
	});
	it("should render children", () => {
		render(
			<Provider store={store}>
				<CalendarGrid>
					<div data-testid="child" />
				</CalendarGrid>
			</Provider>
		);

		const child = screen.getByTestId("child");

		expect(child).toBeInTheDocument();
	});
});
