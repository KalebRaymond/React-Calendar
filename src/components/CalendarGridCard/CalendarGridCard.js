import React from "react";
import "./CalendarGridCard.scss";
import { useTranslation } from "react-i18next";

const CalendarGridCard = (props) => {
	const { t } = useTranslation();

	return (
		<div
			className={`CalendarGridCard ${props.grayed ? "grayed" : ""}`}
			key={props.keyProp}
			data-testid="CalendarGridCard"
		>
			<div className="dateContainer" id="date-container">
				<span className={`date ${props.isTodaysDate ? "todaysDate" : ""}`}>
					{props.date}
					{props.isTodaysDate && (
						<span className="visuallyHidden">
							{t("calendarGridCard.todaysDate")}
						</span>
					)}
				</span>
			</div>
			<div id="card-body">Events go here</div>
		</div>
	);
};

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
