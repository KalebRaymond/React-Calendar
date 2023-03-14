import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MultipleDateEvent.scss";
import EditEventModal from "../EditEventModal/EditEventModal";
import { t } from "i18next";

const MultipleDateEvent = (props) => {
	const { event } = props;
	const [showModal, setShowModal] = useState(false);

	const handleOnClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	const renderEventButton = () => {
		return event.isStartOfButton ? (
			<button
				className="eventButton multiDateEventButton"
				data-testid="MultipleDateEvent"
				style={{ width: `calc((100% * ${event.buttonLength}  - 0.15rem)` }} //Need to subtract 2 * 0.15rem margin
				aria-label={t("event.labels.multiDateEvent", {
					eventName: event.eventName,
					startDate: event.startDate,
					endDate: event.endDate,
				})}
				onClick={(e) => {
					e.stopPropagation();
					handleOnClick();
				}}
			>
				<span className="eventName">{event.eventName}</span>
			</button>
		) : (
			<button
				className="eventButton placeholderEventButton"
				data-testid="MultipleDateEvent"
				aria-label={t("event.labels.multiDateEvent", {
					eventName: event.eventName,
					startDate: event.startDate,
					endDate: event.endDate,
				})}
				onClick={(e) => {
					e.stopPropagation();
					handleOnClick();
				}}
			></button>
		);
	};

	return (
		<>
			{renderEventButton()}
			{showModal && (
				<EditEventModal
					event={event}
					onClose={handleCloseModal}
				></EditEventModal>
			)}
		</>
	);
};

MultipleDateEvent.propTypes = {};

MultipleDateEvent.defaultProps = {};

export default MultipleDateEvent;
