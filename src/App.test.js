import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import store from "./app/store.js";

describe("<App />", () => {
	test("it should mount", () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(true);
	});
});
