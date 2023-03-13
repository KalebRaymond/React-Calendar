import "./App.scss";
import "./i18n";
import CalendarContainer from "components/CalendarContainer/CalendarContainer";
import React, { Component } from "react";
import SidePanel from "components/SidePanel/SidePanel";
import CalendarToolbar from "components/CalendarToolbar/CalendarToolbar";
import { ThemeProvider } from "context/ThemeContext";
import { t } from "i18next";

class App extends Component {
	render() {
		return (
			<div className="App">
				<ThemeProvider>
					<header
						className="toolbarHeader"
						aria-label={t("toolbar.labels.toolbar")}
					>
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
