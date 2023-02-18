import React from "react";
import "./CalendarToolbar.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";

import { useDispatch } from "react-redux";
import {
	incrementMonth,
	decrementMonth,
	fetchEvents,
	postEvent,
} from "../../reducers/calendarReducer";
import axios from "axios";

const CalendarToolbar = (props) => {
	const { currentMonth, currentYear } = props;

	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleLeftNavClick = () => {
		dispatch(decrementMonth());
	};

	const handleRightNavClick = () => {
		dispatch(incrementMonth());
	};

	const testFetchEvents = () => {
		console.log("### Testing fetchEvents");
		dispatch(fetchEvents());
	};

	return (
		<div className={"CalendarToolbar"} data-testid="CalendarToolbar">
			<div className="toolbarSection" id="month-year">
				<span>{`${currentMonth} ${currentYear}`}</span>
			</div>
			<div
				className="toolbarSection"
				id="nav-buttons"
				role="group"
				aria-label={t("calendarToolbar.mainControls")} /*Necessary?*/
			>
				<IconButton
					name="prevMonth"
					ariaLabel={t("calendarToolbar.leftNavButton")}
					onClick={handleLeftNavClick}
				>
					<i className="bi bi-chevron-left"></i>
				</IconButton>
				<IconButton
					name="nextMonth"
					ariaLabel={t("calendarToolbar.rightNavButton")}
					onClick={handleRightNavClick}
				>
					<i className="bi bi-chevron-right"></i>
				</IconButton>
			</div>
		</div>
	);
};

CalendarToolbar.propTypes = {};

CalendarToolbar.defaultProps = {};

export default CalendarToolbar;
