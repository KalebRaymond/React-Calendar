import "./App.scss";

import CalendarContainer from "components/CalendarContainer/CalendarContainer";
import React, { Component } from "react";
import axios from "axios";

class App extends Component {
	componentDidMount() {
		console.log("### Testing fetching events from json");

		axios
			.get("http://localhost:8080/events")
			.then((response) => {
				console.log(response.data);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		return (
			<div className="App">
				<CalendarContainer></CalendarContainer>
			</div>
		);
	}
}

export default App;
