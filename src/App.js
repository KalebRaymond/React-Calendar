import "./App.scss";
import "./i18n";
import CalendarContainer from "components/CalendarContainer/CalendarContainer";
import React, { Component } from "react";

class App extends Component {
	render() {
		return (
			<div className="App">
				<CalendarContainer></CalendarContainer>
			</div>
		);
	}
}

export default App;
