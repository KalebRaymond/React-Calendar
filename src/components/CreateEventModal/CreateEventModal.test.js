import React from "react";
import {
	fireEvent,
	render,
	screen,
	waitForElementToBeRemoved,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CreateEventModal from "./CreateEventModal";
import { fn } from "moment";

describe("<CreateEventModal />", () => {
	test("it should mount", () => {
		render(<CreateEventModal />);

		const createEventModal = screen.getByTestId("CreateEventModal");

		expect(createEventModal).toBeInTheDocument();
	});
	it("should call onClose function when close button is pressed", async () => {
		const onCloseMock = jest.fn();

		render(<CreateEventModal onClose={onCloseMock} />);

		const closeButton = screen.getByRole("button", { id: "close-button" });

		fireEvent.click(closeButton);

		expect(onCloseMock).toHaveBeenCalled();
	});
});
