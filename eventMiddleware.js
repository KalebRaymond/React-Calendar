const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("events.json");
const db = low(adapter);
const moment = require("moment");

module.exports = (req, res, next) => {
	if (req.method === "GET" && req.path === "/events") {
		getEvents(req, res, next);
	} else if (req.method === "POST" && req.path === "/events") {
		postEvent(req, res, next);
	} else {
		next();
	}
};

getEvents = (req, res, next) => {
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

	const filteredEvents = Object.keys(events)
		.filter((key) => {
			const eventDate = moment(key);
			return (
				eventDate.isSameOrAfter(startDate, "day") &&
				eventDate.isSameOrBefore(endDate, "day")
			);
		})
		.reduce((obj, eventDate) => {
			return {
				...obj,
				[eventDate]: events[eventDate],
			};
		}, {});

	res.json(filteredEvents);
};

postEvent = (req, res, next) => {
	const event = req.body;

	let eventDb = db.get("events").value();

	console.log("### eventDb", eventDb);
	console.log("### event startDate", event.startDate);
	console.log("### eventDb startDate", eventDb[event.startDate]);

	//Add the event into the database
	const startDate = moment(event.startDate);
	const endDate =
		event.endDate && event.endDate.length
			? moment(event.endDate)
			: moment(event.startDate);
	//Iterate over the days that the event takes place on
	for (
		let eventDate = moment(startDate);
		eventDate.isSameOrBefore(endDate);
		eventDate.add(1, "days")
	) {
		const eventDateSerial = eventDate.format("YYYY-MM-DD");
		//Add event to the array of events for this date
		eventDb = {
			...eventDb,
			[eventDateSerial]: eventDb[eventDateSerial]
				? [...eventDb[eventDateSerial], event]
				: [event],
		};
	}

	db.set("events", eventDb).write();

	console.log({ eventDb });

	// send response back to client
	//res.send("Data updated successfully");
};