import React, { useState } from "react";
import "./CalendarGridCard.scss";
import { useTranslation } from "react-i18next";
import CreateEventModal from "components/CreateEventModal/CreateEventModal";

const CalendarGridCard = (props) => {
	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div
				className={`CalendarGridCard ${props.grayed ? "grayed" : ""}`}
				key={props.keyProp}
				data-testid="CalendarGridCard"
				tabindex="0"
				role="gridcell"
				aria-label={props.cardAriaLabel}
			>
				<div className="dateContainer" id="date-container">
					<span className={`date ${props.isTodaysDate ? "todaysDate" : ""}`}>
						{props.date}
						{props.isTodaysDate && (
							<span className="visuallyHidden">
								{t("calendarGridCard.todaysDate")}
							</span>
						)}
					</span>
				</div>
				<div
					className="clickable"
					id="card-body"
					role="region"
					onClick={handleOpenModal}
				>
					Events go here
				</div>
			</div>
			{showModal && (
				<CreateEventModal onClose={handleCloseModal}></CreateEventModal>
			)}
		</>
	);
};

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
