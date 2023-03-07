import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MultipleDateEvent.scss";
import EditEventModal from "../EditEventModal/EditEventModal";

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
				style={{ width: `calc((100% * ${event.buttonLength}  - 0.15rem)` }} //Need to subtract 2 * 0.15rem margin
			>
				<span className="eventName">{event.eventName}</span>
			</div>
		) : (
			<div className="eventBtn placeholderEventBtn"></div>
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
		>
			{renderEventButton()}
			{showModal && (
				<EditEventModal
					initialStartDate={event.startDate}
					initialEndDate={event.endDate}
					onClose={handleCloseModal}
				></EditEventModal>
			)}
		</div>
	);
};

MultipleDateEvent.propTypes = {};

MultipleDateEvent.defaultProps = {};

export default MultipleDateEvent;
