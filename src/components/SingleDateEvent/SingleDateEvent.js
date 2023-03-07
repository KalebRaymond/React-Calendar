import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SingleDateEvent.scss";
import CalendarService from "../../services/CalendarService";
import EditEventModal from "../EditEventModal/EditEventModal";

const SingleDateEvent = (props) => {
	const { event } = props;
	const [showModal, setShowModal] = useState(false);

	const handleOnClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
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
				{showModal && (
					<EditEventModal
						initialStartDate={event.startDate}
						initialEndDate={event.endDate}
						onClose={handleCloseModal}
					></EditEventModal>
				)}
			</div>
		</div>
	);
};

SingleDateEvent.propTypes = {};

SingleDateEvent.defaultProps = {};

export default SingleDateEvent;
