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
		let curRow = [];

		//Generate dates for previous month
		const prevMonth = moment(focusedDateObj).subtract(1, "months");
		const prevMonthIndex = prevMonth.month();
		const prevMonthYear = prevMonth.year();
		let prevMonthDate = prevMonth.daysInMonth() - firstDayOfMonthIndex + 1;
		for (let i = 0; i < firstDayOfMonthIndex; i++) {
			curRow.push({
				month: prevMonthIndex,
				date: prevMonthDate,
				year: prevMonthYear,
				dayOfWeek: i,
			});
			prevMonthDate = prevMonthDate + 1;

			if (curRow.length === 7) {
				calendar.push(curRow);
				curRow = [];
			}
		}

		//Generate dates for current month
		for (let i = 1; i <= daysInMonth; i++) {
			focusedDateObj.set("date", i);

			curRow.push({
				month: monthIndex,
				date: i,
				year: year,
				dayOfWeek: focusedDateObj.day(),
			});

			if (curRow.length === 7) {
				calendar.push(curRow);
				curRow = [];
			}
		}

		//Generate dates for next month
		const nextMonth = moment(focusedDateObj).add(1, "months");
		const nextMonthIndex = nextMonth.month();
		const nextMonthYear = nextMonth.year();
		let nextMonthDate = 1;
		for (let i = lastDayOfMonthIndex + 1; i < 7; i++) {
			curRow.push({
				month: nextMonthIndex,
				date: nextMonthDate,
				year: nextMonthYear,
				dayOfWeek: i,
			});
			nextMonthDate++;

			if (curRow.length === 7) {
				calendar.push(curRow);
				curRow = [];
			}
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
	generateEventMatrix: function (events, visibleDates) {
		//Create a matrix of empty arrays for each day of the month
		const eventMatrix = visibleDates.map((week) => {
			return week.map((_) => {
				return {
					multiDateEvents: [],
					singleDateEvents: [],
				};
			});
		});

		const curEventPositions = [];

		//Add events to the matrix in the correct position that they will
		//be displayed in the calendar. In order to make the multidate events
		//get drawn in the correct vertical position, need to put a copy of the
		//event in every day of the event's duration in the correct vertical position.
		for (let week = 0; week < eventMatrix.length; week++) {
			for (let day = 0; day < eventMatrix[week].length; day++) {
				//Get the current date string
				///Replace visibleDates with a moment().format() string TODO
				const curDate = moment()
					.set({
						date: visibleDates[week][day].date,
						month: visibleDates[week][day].month,
						year: visibleDates[week][day].year,
					})
					.format("YYYY-MM-DD");

				//Get events that start on this day
				//evens[curDate] contains all events that occur on this date,
				//including multi-day events that may start on an earlier date
				const unseenEvents = events[curDate]
					? events[curDate].filter((event) => {
							return event.startDate === curDate;
					  })
					: [];

				console.log("### unseenEvents", unseenEvents);

				//Add events into first availble slot in curEventPositions
				for (let i = 0; i < unseenEvents.length; i++) {
					this.insertIntoFirstNullIndex(curEventPositions, unseenEvents[i]);
				}

				//Add events to the matrix
				for (let i = 0; i < curEventPositions.length; i++) {
					if (curEventPositions[i]) {
						///Ugly hack to make a deep copy of the event object
						const event = JSON.parse(JSON.stringify(curEventPositions[i]));

						//If the event is a single date event, add it to the singleDateEvents array
						if (event.numDays == 1) {
							eventMatrix[week][day].singleDateEvents.push(event);
						}
						//If the event is a multi date event, add it to the multiDateEvents array
						else {
							//If the event starts on this day, set isStartOfButton to true
							//and set buttonLength to the number of days the event lasts
							if (event.startDate === curDate) {
								event.isStartOfButton = true;
								event.buttonLength = event.numDays;
							}
							//If the event does not start on this day, set isStartOfButton to false
							else {
								event.isStartOfButton = false;
							}

							eventMatrix[week][day].multiDateEvents.push(event);
						}
					}
				}

				//Remove events that end on this day from curEventPositions
				///Might need to move this block down?
				for (let i = 0; i < curEventPositions.length; i++) {
					if (
						curEventPositions[i] &&
						curEventPositions[i].endDate === curDate
					) {
						curEventPositions[i] = null;
					}
				}
			}
		}

		console.log("### eventMatrix", eventMatrix);

		return eventMatrix;
	},

	//Inserts a value into the first null index of an array,
	//or at the end if no indices have a null value
	insertIntoFirstNullIndex: function (arr, val) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === null) {
				arr[i] = val;
				return;
			}
		}

		arr.push(val);
	},
};

export default CalendarService;
