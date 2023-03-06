import React from "react";
import PropTypes from "prop-types";
import styles from "./EventListContainer.scss";
import moment from "moment";
import SingleDateEvent from "components/SingleDateEvent/SingleDateEvent";
import MultipleDateEvent from "components/MultipleDateEvent/MultipleDateEvent";

const EventListContainer = (props) => {
	const { multiDateEvents, singleDateEvents } = props;

	const renderEvents = () => {
		/*
		//Separate events by multiple day and single day events
		const multipleDateEvents = [];
		const singleDateEvents = [];
		for (const event of events) {
			if (event.endDate && event.endDate.length) {
				multipleDateEvents.push(event);
			} else {
				singleDateEvents.push(event);
			}
		}

		const sortFn = (e1, e2) => {
			if (e1.startTime === e2.startTime) {
				return 0;
			}

			//Compare times by creating moment objects
			//Date is arbitrary
			const m1 = moment(`2022-02-27 ${e1.startTime}`);
			const m2 = moment(`2022-02-27 ${e2.startTime}`);

			return m1.isBefore(m2) ? -1 : 1;
		};

		return (
			<ul>
				{multipleDateEvents.sort(sortFn).map((event) => (
					<li>
						<MultipleDateEvent event={event} />
					</li>
				))}
				{singleDateEvents.sort(sortFn).map((event) => (
					<li>
						<SingleDateEvent event={event} />
					</li>
				))}
			</ul>
		);
		*/
		return (
			<ul className="eventList">
				{multiDateEvents.map((event, i) => (
					///This key should use a uuid instead
					<li key={`${event.eventName}-${i}`}>
						<MultipleDateEvent event={event} />
					</li>
				))}
				{singleDateEvents.map((event, i) => (
					<li key={`${event.eventName}-${i}`}>
						<SingleDateEvent event={event} />
					</li>
				))}
			</ul>
		);
	};

	return (
		<div className={"EventListContainer"} data-testid="EventListContainer">
			{renderEvents()}
		</div>
	);
};

EventListContainer.propTypes = {};

EventListContainer.defaultProps = {};

export default EventListContainer;
