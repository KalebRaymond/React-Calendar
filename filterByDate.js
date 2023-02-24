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
			//eventEndDate is optional - if not defined or is empty string,
			//set eventEndDate equal to startDate to signify that this event
			//is a single day event
			const eventEndDate =
				event.endDate && event.endDate.length
					? moment(event.endDate)
					: moment(event.startDate);

			return (
				!eventStartDate.isAfter(endDate) && !eventEndDate.isBefore(startDate)
			);
		});

		res.json(filteredEvents);
	} else {
		next();
	}
};
