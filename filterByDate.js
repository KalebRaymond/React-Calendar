const moment = require("moment");

module.exports = (req, res, next) => {
	if (req.method === "GET" && req.path === "/events") {
		const { startDateSerial, endDateSerial } = req.query;
		const startDate = moment(startDateSerial);
		const endDate = moment(endDateSerial);

		//If start and end dates are not provided, continue
		if (!startDate || !endDate) {
			next();
			return;
		}

		//Return events whose dates overlap the currently visible dates
		const events = req.app.db.value().events;
		const filteredEvents = events.filter((event) => {
			const eventStartDate = moment(event.startDate);
			const eventEndDate = moment(event.endDate);

			console.log({
				eventStartDate: eventStartDate.format("YYYY MM DD"),
				eventEndDate: eventEndDate.format("YYYY MM DD"),
				monthStartDate: startDate.format("YYYY MM DD"),
				monthEndDate: endDate.format("YYYY MM DD"),
			});

			return (
				!eventStartDate.isAfter(endDate) && !eventEndDate.isBefore(startDate)
			);
		});

		res.json(filteredEvents);
	} else {
		next();
	}
};
