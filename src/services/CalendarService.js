import moment from "moment";

const CalendarService = {
	/* 	Given a month and year, returns an array of objects representing
	 *	the dates that are visible on the calendar for that specific month.
	 *	This includes any days from the previous or next month that "spill over".
	 *	Each date object contains the month index, year, date, and day of week index
	 */
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

	/*	Given an object where each key maps a date to an array of objects
	 *	representing the events that start on that date, returns a nested array
	 *	that represents how the events should be displayed on the calendar.
	 *
	 * 	Returns an array containing an array for each calendar row, which contains
	 * 	objects that have a "multiDateEvents" array and a "singleDateEvents" array
	 */
	generateEventMatrix: function (events) {
		return [
			[
				{
					multiDateEvents: [
						{
							eventName: "A",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: true,
							buttonLength: 2,
						},
					],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [
						{
							eventName: "A",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
						{
							eventName: "B",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: true,
							buttonLength: 2,
						},
					],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [
						{
							eventName: "C",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: true,
							buttonLength: 2,
						},
						{
							eventName: "B",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
					],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [
						{
							eventName: "C",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
						{
							eventName: "D",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: true,
							buttonLength: 2,
						},
					],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [
						{
							eventName: "D",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
					],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [],
					singleDateEvents: [],
				},
				{
					multiDateEvents: [],
					singleDateEvents: [
						{
							eventName: "Single 1",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "03:00",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
						{
							eventName: "Single 2",
							startDate: "2023-07-11",
							endDate: "2023-07-12",
							startTime: "14:15",
							endTime: "",
							description: "",
							isStartOfButton: false,
							buttonLength: 1,
						},
					],
				},
			],
			[
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
			],
			[
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
			],
			[
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
			],
			[
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
			],
			[
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
				{ multiDateEvents: [], singleDateEvents: [] },
			],
		];
	},
};

export default CalendarService;
