const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("events.json");
const db = low(adapter);
const moment = require("moment");
const crypto = require("crypto");

//Insecure quick id generator for proof of concept
const generateId = () => {
	return crypto.randomBytes(12).toString("base64");
};

module.exports = (req, res, next) => {
	if (!db.has("events").value()) {
		return;
	}

	if (!req.path === "/events") {
		return;
	}

	switch (req.method) {
		case "GET": {
			getEvents(req, res, next);
			break;
		}
		case "POST": {
			postEvent(req, res, next);
			break;
		}
		case "DELETE": {
			deleteEvent(req, res, next);
			break;
		}
		case "PUT": {
			updateEvent(req, res, next);
			break;
		}
		default: {
			next();
			break;
		}
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
	let event = req.body;

	let eventDb = db.get("events").value();

	if (!eventDb) {
		next();
		return;
	}

	//Add the event into the database
	const startDate = moment(event.startDate);
	const endDate =
		event.endDate && event.endDate.length
			? moment(event.endDate)
			: moment(event.startDate);

	const numDays = endDate.diff(startDate, "days") + 1;
	const id = generateId();

	event = { ...event, ["numDays"]: numDays, ["id"]: id };

	//Iterate over the days that the event takes place on
	for (
		let eventDate = startDate;
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

	//Update database and send back to client
	db.set("events", eventDb).write();
	res.json(eventDb);
};

deleteEvent = (req, res, next) => {
	const { event } = req.query;
	const startDate = moment(event.startDate);
	const endDate = moment(event.endDate);

	let eventDb = db.get("events").value();

	//Iterate over the days that the event takes place on
	for (
		let eventDate = startDate;
		eventDate.isSameOrBefore(endDate);
		eventDate.add(1, "days")
	) {
		//Remove event from the array of events for this date
		const eventDateSerial = eventDate.format("YYYY-MM-DD");
		eventDb[eventDateSerial] = eventDb[eventDateSerial].filter(
			(e) => e.id !== event.id
		);
	}

	//Update database and send back to client
	db.set("events", eventDb).write();
	res.json(eventDb);
};

updateEvent = (req, res, next) => {
	const oldEvent = req.body.oldEvent;
	let updatedEvent = req.body.updatedEvent;
	const eventId = oldEvent.id;

	let eventDb = db.get("events").value();

	//Remove the event from the database
	const startDate = moment(oldEvent.startDate);
	const endDate = moment(oldEvent.endDate);
	for (
		let eventDate = startDate;
		eventDate.isSameOrBefore(endDate);
		eventDate.add(1, "days")
	) {
		//Remove old event from the array of events for this date
		const eventDateSerial = eventDate.format("YYYY-MM-DD");
		eventDb[eventDateSerial] = eventDb[eventDateSerial].filter(
			(e) => e.id !== eventId
		);
	}

	//Add the updated event to the database
	const newStartDate = moment(updatedEvent.startDate);
	const newEndDate = moment(updatedEvent.endDate);
	const numDays = newEndDate.diff(newStartDate, "days") + 1;
	updatedEvent = { ...updatedEvent, ["numDays"]: numDays, ["id"]: eventId };

	for (
		let eventDate = newStartDate;
		eventDate.isSameOrBefore(newEndDate);
		eventDate.add(1, "days")
	) {
		const eventDateSerial = eventDate.format("YYYY-MM-DD");
		//Add event to the array of events for this date
		eventDb = {
			...eventDb,
			[eventDateSerial]: eventDb[eventDateSerial]
				? [...eventDb[eventDateSerial], updatedEvent]
				: [updatedEvent],
		};
	}

	//Update database and send back to client
	db.set("events", eventDb).write();
	res.json(eventDb);
};
