import React from "react";
import styles from "./CalendarGrid.scss";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";
import { useTranslation } from "react-i18next";

const CalendarGrid = (props) => {
	const { t } = useTranslation();
	return (
		<div
			className="CalendarGrid"
			data-testid="CalendarGrid"
			role="grid"
			aria-label={t("calendarGrid.labels.calendarGrid")}
		>
			<WeekDaysHeader></WeekDaysHeader>
			{props.children}
		</div>
	);
};

export default CalendarGrid;
