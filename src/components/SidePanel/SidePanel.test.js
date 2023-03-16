import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SidePanel from "./SidePanel";
import { ThemeProvider } from "context/ThemeContext";

describe("<SidePanel />", () => {
	test("it should mount", () => {
		render(
			<ThemeProvider>
				<SidePanel />
			</ThemeProvider>
		);

		const sidePanel = screen.getByTestId("SidePanel");

		expect(sidePanel).toBeInTheDocument();
	});
});
