import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateEventModal from "./CreateEventModal";
import { Provider } from "react-redux";
import store from "../../app/store.js";
import i18n from "i18n";

describe("<CreateEventModal />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<CreateEventModal />
			</Provider>
		);

		const createEventModal = screen.getByTestId("CreateEventModal");

		expect(createEventModal).toBeInTheDocument();
	});
	it("should call onClose function when close button is pressed", async () => {
		const onCloseMock = jest.fn();

		render(
			<Provider store={store}>
				<CreateEventModal onClose={onCloseMock} />
			</Provider>
		);

		const closeButton = screen.getByRole("button", {
			name: i18n.t("eventModal.labels.closeButton"),
		});

		fireEvent.click(closeButton);

		expect(onCloseMock).toHaveBeenCalled();
	});
});
