import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./WeekDaysHeader.module.scss";

const WeekDaysHeader = () => {
	///Refactor this component to use CalendarGridRow

	const { t } = useTranslation();

	const days = [
		[t("days.sun"), t("days.sunday")],
		[t("days.mon"), t("days.monday")],
		[t("days.tue"), t("days.tuesday")],
		[t("days.wed"), t("days.wednesday")],
		[t("days.thu"), t("days.thursday")],
		[t("days.fri"), t("days.friday")],
		[t("days.sat"), t("days.saturday")],
	];

	const renderDays = () => {
		return days.map((day, i) => {
			return (
				<div
					className="weekDay"
					role="columnheader"
					tabIndex="0"
					aria-label={day[1]}
					key={day[0]}
				>
					{day[0]}
				</div>
			);
		});
	};

	return (
		<div className={styles.WeekDaysHeader} data-testid="WeekDaysHeader">
			{renderDays()}
		</div>
	);
};

WeekDaysHeader.propTypes = {};

WeekDaysHeader.defaultProps = {};

export default WeekDaysHeader;
