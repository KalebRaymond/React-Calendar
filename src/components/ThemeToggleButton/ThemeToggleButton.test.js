import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThemeToggleButton from "./ThemeToggleButton";
import i18n from "i18n";
import { ThemeProvider } from "context/ThemeContext";
import { fireEvent } from "@testing-library/dom";

describe("<ThemeToggleButton />", () => {
	test("it should mount", () => {
		render(
			<ThemeProvider>
				<ThemeToggleButton />
			</ThemeProvider>
		);

		const themeToggleButton = screen.getByTestId("ThemeToggleButton");

		expect(themeToggleButton).toBeInTheDocument();
	});
	it("Should initially display the moon icon", async () => {
		const { container } = render(
			<ThemeProvider>
				<ThemeToggleButton />
			</ThemeProvider>
		);

		const icon = container.querySelector(".bi-moon-fill");
		expect(icon).toBeInTheDocument();
	});
	it("Should display the correct icon when clicked", async () => {
		const { container } = render(
			<ThemeProvider>
				<ThemeToggleButton />
			</ThemeProvider>
		);

		const toggleButton = container.querySelector(".IconButton button");

		//Button initially displays the moon icon, so clicking it should display the sun icon
		fireEvent.click(toggleButton);
		const sunIcon = container.querySelector(".bi-sun-fill");
		expect(sunIcon).toBeInTheDocument();

		//Clicking the button again should display the moon icon
		fireEvent.click(toggleButton);
		const moonIcon = container.querySelector(".bi-moon-fill");
		expect(sunIcon).toBeInTheDocument();
	});
});
