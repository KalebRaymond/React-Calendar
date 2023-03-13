import React from "react";
import PropTypes from "prop-types";
import styles from "./EventListContainer.scss";
import moment from "moment";
import SingleDateEvent from "components/SingleDateEvent/SingleDateEvent";
import MultipleDateEvent from "components/MultipleDateEvent/MultipleDateEvent";
import { t } from "i18next";

const EventListContainer = (props) => {
	const { multiDateEvents, singleDateEvents } = props;

	const renderEvents = () => {
		return (
			<ul
				className="eventList"
				aria-label={t("calendarGridCard.labels.eventList")}
			>
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
