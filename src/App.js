import "./App.scss";
import "./i18n";
import CalendarContainer from "components/CalendarContainer/CalendarContainer";
import React, { Component } from "react";
import SidePanel from "components/SidePanel/SidePanel";
import CalendarToolbar from "components/CalendarToolbar/CalendarToolbar";
import { ThemeProvider } from "context/ThemeContext";

class App extends Component {
	render() {
		return (
			<div className="App">
				<ThemeProvider>
					<header className="toolbarHeader">
						<CalendarToolbar></CalendarToolbar>
					</header>
					<div className="content">
						<SidePanel></SidePanel>
						<CalendarContainer></CalendarContainer>
					</div>
				</ThemeProvider>
			</div>
		);
	}
}

export default App;
