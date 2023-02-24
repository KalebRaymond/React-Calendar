import moment from "moment";

const CalendarService = {
	getVisibleDates: function (monthIndex, year) {
		const focusedDateObj = moment();
		focusedDateObj.set("month", monthIndex);
		focusedDateObj.set("year", year);

		const daysInMonth = Number(focusedDateObj.daysInMonth());
		//Index of the day of the week of the first day of the month
		//Ex. first day of month lands on a wednesday, index is 3
		const firstDayOfMonthIndex = Number(
			focusedDateObj.startOf("month").format("d")
		);
		//Index of the day of the week of the last day of the month
		//Need to clone since endOf mutates the moment object
		const lastDayOfMonthIndex = Number(
			moment(focusedDateObj).endOf("month").format("d")
		);

		const calendar = [];

		//Generate dates for previous month
		const prevMonth = moment(focusedDateObj).subtract(1, "months");
		const prevMonthIndex = prevMonth.month();
		const prevMonthYear = prevMonth.year();
		let prevMonthDate = prevMonth.daysInMonth() - firstDayOfMonthIndex + 1;
		for (let i = 0; i < firstDayOfMonthIndex; i++) {
			calendar.push({
				month: prevMonthIndex,
				date: prevMonthDate,
				year: prevMonthYear,
				dayOfWeek: i,
			});
			prevMonthDate = prevMonthDate + 1;
		}

		//Generate dates for current month
		for (let i = 1; i <= daysInMonth; i++) {
			focusedDateObj.set("date", i);

			calendar.push({
				month: monthIndex,
				date: i,
				year: year,
				dayOfWeek: focusedDateObj.day(),
			});
		}

		//Generate dates for next month
		const nextMonth = moment(focusedDateObj).add(1, "months");
		const nextMonthIndex = nextMonth.month();
		const nextMonthYear = nextMonth.year();
		let nextMonthDate = 1;
		for (let i = lastDayOfMonthIndex + 1; i < 7; i++) {
			calendar.push({
				month: nextMonthIndex,
				date: nextMonthDate,
				year: nextMonthYear,
				dayOfWeek: i,
			});
			nextMonthDate++;
		}

		return calendar;
	},
};

export default CalendarService;
