import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import IconButton from "./IconButton";

describe("<IconButton />", () => {
	test("it should mount", () => {
		render(<IconButton />);

		const iconButton = screen.getByTestId("IconButton");

		expect(iconButton).toBeInTheDocument();
	});
	test("it should apply name prop to button child", async () => {
		const btnLabel = "btnLabeL";

		render(<IconButton ariaLabel={btnLabel} />);

		const btn = await screen.getByRole("button", { "aria-label": btnLabel });

		expect(btn).toBeInTheDocument();
	});
	it("should call onClick method when clicked", async () => {
		const mockClickFn = jest.fn();

		render(<IconButton onClick={mockClickFn} />);

		fireEvent.click(await screen.getByRole("button"));

		expect(mockClickFn).toHaveBeenCalled();
	});
});
