import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleDateEvent.scss";
import CalendarService from "../../services/CalendarService";

const SingleDateEvent = (props) => {
	const { event } = props;

	const handleOnClick = () => {
		console.log("###", { event });
	};

	return (
		<div
			className="SingleDateEvent"
			data-testid="SingleDateEvent"
			onClick={(e) => {
				e.stopPropagation();
				handleOnClick();
			}}
		>
			<div className="content">
				<div className="bullet"></div>
				<span className="eventTime">
					{CalendarService.convertTo12HourTime(event.startTime)}
				</span>
				<strong className="eventName">{event.eventName}</strong>
			</div>
		</div>
	);
};

SingleDateEvent.propTypes = {};

SingleDateEvent.defaultProps = {};

export default SingleDateEvent;
