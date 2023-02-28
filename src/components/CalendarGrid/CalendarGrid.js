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
	const dispatch = useDispatch();
	const [calendarContent, setCalendarContent] = useState();

	const focusedMonth = useSelector((state) =>
		moment(state.calendar.focusedDate).month()
	);
	const focusedYear = useSelector((state) =>
		moment(state.calendar.focusedDate).year()
	);
	const todaysDate = moment();

	///Shallow copy of dates object - performance hit?
	const renderCalendarContent = ([...dates]) => {
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
								date={moment().set({
									date: dateObject.date,
									month: dateObject.month,
									year: dateObject.year,
								})}
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

	useEffect(() => {
		const dates = CalendarService.getVisibleDates(focusedMonth, focusedYear);
		setCalendarContent(renderCalendarContent(dates));
		dispatch(setVisibleDates(dates));
	}, [focusedMonth, focusedYear]);

	return (
		<div className={styles.CalendarGrid} data-testid="CalendarGrid">
			<WeekDaysHeader></WeekDaysHeader>
			{calendarContent}
		</div>
	);
};

export default CalendarGrid;
