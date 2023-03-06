import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import CalendarGridCard from "components/CalendarGridCard/CalendarGridCard";
import CalendarGridRow from "components/CalendarGridRow/CalendarGridRow";
import CalendarService from "services/CalendarService";
import moment from "moment";
import React, { useEffect, useState } from "react";
import styles from "./CalendarGrid.module.scss";
import TranslationService from "services/TranslationService";
import WeekDaysHeader from "components/WeekDaysHeader/WeekDaysHeader";
import { setVisibleDates } from "../../reducers/calendarReducer";
import { useDispatch } from "react-redux";

const CalendarGrid = () => {
	const { t } = useTranslation();

	const focusedMonth = useSelector((state) =>
		moment(state.calendar.focusedDate).month()
	);
	const focusedYear = useSelector((state) =>
		moment(state.calendar.focusedDate).year()
	);
	const todaysDate = moment();

	const visibleDates = useSelector((state) => state.calendar.visibleDates);

	const eventMatrix = useSelector((state) => {
		return CalendarService.generateEventMatrix(
			state.calendar.events,
			state.calendar.visibleDates
		);
	});

	///Shallow copy of dates object - performance hit?
	const renderCalendarContent = ([...dates]) => {
		let calendarContent = [];

		calendarContent = dates.map((row, i) => (
			<CalendarGridRow key={`row-${focusedMonth}-${focusedYear}-${i}`}>
				{row.map((dateObject, j) => (
					<CalendarGridCard
						cardAriaLabel={t("dateFormats.MDY", {
							month: TranslationService.getMonthTranslation(dateObject.month),
							day: TranslationService.getOrdinal(dateObject.date),
							year: dateObject.year,
						})}
						date={moment().set({
							date: dateObject.date,
							month: dateObject.month,
							year: dateObject.year,
						})}
						events={eventMatrix[i][j]}
						grayed={dateObject.month !== focusedMonth}
						isTodaysDate={
							dateObject.month === todaysDate.month() &&
							dateObject.year === todaysDate.year() &&
							dateObject.date === todaysDate.date()
						}
						key={`date-${dateObject.month}-${dateObject.date}-${dateObject.year}`}
					></CalendarGridCard>
				))}
			</CalendarGridRow>
		));

		return calendarContent;
	};

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			{renderCalendarContent(visibleDates)}
		</div>
	);
};

export default CalendarGrid;
