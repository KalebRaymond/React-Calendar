import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./WeekDaysHeader.scss";

const WeekDaysHeader = () => {
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
		return days.map((day, _) => {
			return (
				<div
					className="weekDay"
					role="columnheader"
					tabIndex="0"
					aria-label={day[1]}
					key={day[0]}
				>
					<span>{day[0]}</span>
				</div>
			);
		});
	};

	return (
		<div
			className={"WeekDaysHeader"}
			data-testid="WeekDaysHeader"
			role="row"
			aria-label={t("weekDayHeader.labels.weekDayHeader")}
		>
			{renderDays()}
		</div>
	);
};

WeekDaysHeader.propTypes = {};

WeekDaysHeader.defaultProps = {};

export default WeekDaysHeader;
