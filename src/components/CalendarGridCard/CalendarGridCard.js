import React, { useEffect, useState } from "react";
import "./CalendarGridCard.scss";
import { useTranslation } from "react-i18next";
import CreateEventModal from "components/CreateEventModal/CreateEventModal";
import { useSelector } from "react-redux";
import { use } from "i18next";
import EventListContainer from "components/EventListContainer/EventListContainer";

const CalendarGridCard = (props) => {
	const { cardAriaLabel, date, grayed, isTodaysDate, keyProp } = props;

	const { t } = useTranslation();
	const [showModal, setShowModal] = useState(false);
	const events = useSelector((state) =>
		state.calendar.events[date.format("YYYY-MM-DD")]
			? state.calendar.events[date.format("YYYY-MM-DD")]
			: []
	);

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	useEffect(() => {}, [events]);

	return (
		<>
			<div
				className={`CalendarGridCard ${grayed ? "grayed" : ""}`}
				key={keyProp}
				data-testid="CalendarGridCard"
				tabIndex="0"
				role="gridcell"
				aria-label={cardAriaLabel}
			>
				<div className="dateContainer" id="date-container">
					<span className={`date ${isTodaysDate ? "todaysDate" : ""}`}>
						{date.format("D")}
						{isTodaysDate && (
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
					<EventListContainer events={events}></EventListContainer>
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
