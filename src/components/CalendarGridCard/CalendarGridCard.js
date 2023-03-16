import React, { useContext, useState } from "react";
import "./CalendarGridCard.scss";
import { useTranslation } from "react-i18next";
import CreateEventModal from "components/CreateEventModal/CreateEventModal";
import EventListContainer from "components/EventListContainer/EventListContainer";
import { ThemeContext } from "context/ThemeContext";

const CalendarGridCard = (props) => {
	const { cardAriaLabel, date, events, grayed, isTodaysDate } = props;
	const { t } = useTranslation();
	const { theme } = useContext(ThemeContext);
	const [showModal, setShowModal] = useState(false);
	const numEvents =
		events.singleDateEvents.length + events.multiDateEvents.length;

	const numEventsAriaLabel = (function () {
		switch (numEvents) {
			case 0:
				return t("calendarGridCard.labels.noEvents");
			case 1:
				return t("calendarGridCard.labels.oneEvent");
			default:
				return t("calendarGridCard.labels.multipleEvents", {
					count: numEvents,
				});
		}
	})();

	const handleOpenModal = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<div
				className={`CalendarGridCard ${grayed ? "grayed" : ""} ${
					theme === "light" ? "light" : "dark"
				}`}
				data-testid="CalendarGridCard"
				role="gridcell"
			>
				<div className="dateContainer">
					<span
						id="card-date"
						className={`date ${isTodaysDate ? "todaysDate" : ""}`}
					>
						{date.format("D")}
					</span>
				</div>
				<button
					className="cardButton"
					id="card-button"
					onClick={handleOpenModal}
					///Quite a large announcement here
					aria-label={`${cardAriaLabel} ${
						isTodaysDate ? t("calendarGridCard.labels.todaysDate") : ""
					} ${numEventsAriaLabel}  ${t("calendarGridCard.labels.addNewEvent")}`}
				></button>
				<div
					className="eventListContainer"
					role="region"
					aria-label={
						numEvents == 0 ? t("calendarGridCard.labels.noEvents") : ""
					}
				>
					{numEvents > 0 && (
						<EventListContainer
							multiDateEvents={events.multiDateEvents}
							singleDateEvents={events.singleDateEvents}
						></EventListContainer>
					)}
				</div>
			</div>
			{showModal && (
				<CreateEventModal
					initialStartDate={date.format("YYYY-MM-DD")}
					initialEndDate={date.format("YYYY-MM-DD")}
					onClose={handleCloseModal}
				></CreateEventModal>
			)}
		</>
	);
};

CalendarGridCard.propTypes = {};

CalendarGridCard.defaultProps = {};

export default CalendarGridCard;
