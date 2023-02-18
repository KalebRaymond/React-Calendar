import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";
import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import CalendarService from "services/CalendarService";
import moment from "moment";
import React from "react";
import styles from "./CalendarGrid.module.scss";
import TranslationService from "services/TranslationService";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";

const CalendarGrid = () => {
	const { t } = useTranslation();

	const renderDates = () => {
		const dates = CalendarService.getVisibleDates(focusedMonth, focusedYear);

		let calendarContent = [];
		let rowIndex = 0;

		while (dates.length) {
			const row = dates.splice(0, 7);

			const gridRow = (
				<CalendarGridRow
					keyProp={`row-${focusedMonth}-${focusedYear}-${rowIndex}`}
				>
					{row.map((dateObject, i) => {
						return (
							<CalendarGridCard
								date={dateObject.date}
								cardAriaLabel={t("dateFormats.MDY", {
									month: TranslationService.getMonthTranslation(
										dateObject.month
									),
									day: TranslationService.getOrdinal(dateObject.date),
									year: dateObject.year,
								})}
								keyProp={`date-${dateObject.month}-${dateObject.date}-${dateObject.year}`}
								grayed={dateObject.month !== focusedMonth}
								isTodaysDate={
									dateObject.month === todaysDate.month() &&
									dateObject.year === todaysDate.year() &&
									dateObject.date === todaysDate.date()
								}
							></CalendarGridCard>
						);
					})}
				</CalendarGridRow>
			);

			calendarContent.push(gridRow);
			rowIndex = rowIndex + 1;
		}

		return calendarContent;
	};

	const focusedMonth = useSelector((state) => state.calendar.focusedMonthIndex);
	const focusedYear = useSelector((state) => state.calendar.focusedYear);
	const todaysDate = moment();

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			{renderDates()}
		</div>
	);
};

export default CalendarGrid;
