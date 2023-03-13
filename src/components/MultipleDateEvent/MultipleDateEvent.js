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
			<div
				className="eventBtn multiDateEventBtn"
				role="button"
				style={{ width: `calc((100% * ${event.buttonLength}  - 0.15rem)` }} //Need to subtract 2 * 0.15rem margin
				aria-label={t("event.labels.multiDateEvent", {
					eventName: event.eventName,
					startDate: event.startDate,
					endDate: event.endDate,
				})}
			>
				<span className="eventName">{event.eventName}</span>
			</div>
		) : (
			<div
				className="eventBtn placeholderEventBtn"
				role="button"
				aria-label={t("event.labels.multiDateEvent", {
					eventName: event.eventName,
					startDate: event.startDate,
					endDate: event.endDate,
				})}
			>
				{" "}
			</div>
		);
	};

	return (
		<div
			className={"MultipleDateEvent"}
			data-testid="MultipleDateEvent"
			onClick={(e) => {
				e.stopPropagation();
				handleOnClick();
			}}
			tabIndex="0"
		>
			{renderEventButton()}
			{showModal && (
				<EditEventModal
					event={event}
					onClose={handleCloseModal}
				></EditEventModal>
			)}
		</div>
	);
};

MultipleDateEvent.propTypes = {};

MultipleDateEvent.defaultProps = {};

export default MultipleDateEvent;
