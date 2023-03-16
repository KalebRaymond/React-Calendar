import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import store from "./app/store.js";
import { ThemeProvider } from "context/ThemeContext";

describe("<App />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<ThemeProvider>
					<App />
				</ThemeProvider>
			</Provider>
		);

		expect(true);
	});
});
