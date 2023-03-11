import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./SingleDateEvent.scss";
import EditEventModal from "../EditEventModal/EditEventModal";
import { useTranslation } from "react-i18next";

const SingleDateEvent = (props) => {
	const { event } = props;
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslation();

	const handleOnClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const convertTo12HourTime = (time) => {
		const [hour, minute] = time.split(":");
		const ampm = hour >= 12 ? t("time.pm") : t("time.am");
		const hour12 = hour % 12 || 12;

		return `${hour12}:${minute}${ampm}`;
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
				<span className="eventDetails">
					<span className="eventTime">
						{convertTo12HourTime(event.startTime)}
					</span>
					<strong className="eventName">{event.eventName}</strong>
				</span>
			</div>
			{showModal && (
				<EditEventModal
					event={event}
					onClose={handleCloseModal}
				></EditEventModal>
			)}
		</div>
	);
};

SingleDateEvent.propTypes = {};

SingleDateEvent.defaultProps = {};

export default SingleDateEvent;
