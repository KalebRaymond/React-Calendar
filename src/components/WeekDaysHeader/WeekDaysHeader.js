import React from "react";
import { useTranslation } from "react-i18next";
import TranslationService from "services/TranslationService";
import styles from "./WeekDaysHeader.scss";

const WeekDaysHeader = () => {
	const { t } = useTranslation();

	const renderDays = () => {
		return [0, 1, 2, 3, 4, 5, 6].map((_, i) => {
			return (
				<div
					className="weekDay"
					role="columnheader"
					tabIndex={-1}
					key={`weekday-${i}`}
				>
					<span>{TranslationService.getWeekdayAbbreviatedFromIndex(i)}</span>
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
