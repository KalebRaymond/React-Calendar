const moment = require("moment");

module.exports = (req, res, next) => {
	if (req.method === "GET" && req.path === "/events") {
		const { startDate, endDate } = req.query;
		//If start and end dates are not provided, continue
		if (!startDate || !endDate) {
			next();
			return;
		}

		const filteredData = res.locals.data.filter(
			(event) =>
				!moment(event.startDate).isAfter(endDate) &&
				!moment(event.endDate).isBefore(endDate)
		);

		res.json(filteredData);
	} else {
		next();
	}

	/*
    // Check if the request is for the resource we want to filter
	if (req.path === "/events") {
		const { start, end } = req.query;
		// If start and end dates are not provided, just continue with the next middleware
		if (!start || !end) {
			next();
			return;
		}

		// Parse start and end dates using Moment.js
		const startDate = moment(start, "YYYY-MM-DD");
		const endDate = moment(end, "YYYY-MM-DD");

		// Filter the response based on start and end dates
		const filteredData = res.locals.data.filter(
			(event) =>
				moment(event.start_date).isBetween(startDate, endDate, null, "[]") &&
				moment(event.end_date).isBetween(startDate, endDate, null, "[]")
		);

		// Send the filtered response
		res.json(filteredData);
	} else {
		// If the request is not for the resource we want to filter, just continue with the next middleware
		next();
	}
    */
};
