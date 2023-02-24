import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import EventForm from "./EventForm";
import { Provider } from "react-redux";
import store from "../../app/store.js";

describe("<EventForm />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<EventForm />
			</Provider>
		);

		const eventForm = screen.getByTestId("EventForm");

		expect(eventForm).toBeInTheDocument();
	});
});
