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
	test("it should apply name prop to button child", () => {
		const btnName = "testName";

		const { container } = render(<IconButton name={btnName} />);

		const btn = container.querySelector(`button[name="${btnName}"]`);

		expect(btn).toBeInTheDocument();
	});
	it("should call onClick method when clicked", () => {
		const mockClickFn = jest.fn();

		const { container } = render(<IconButton onClick={mockClickFn} />);

		fireEvent.click(container.getElementsByClassName("btn")[0]);

		expect(mockClickFn).toHaveBeenCalled();
	});
});
