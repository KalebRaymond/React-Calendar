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
	const hasEvents =
		events.singleDateEvents?.length > 0 || events.multiDateEvents?.length > 0;

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
				tabIndex="0"
				role="gridcell"
				aria-label={cardAriaLabel}
			>
				<span className="visuallyHidden">
					{t("calendarGridCard.labels.addNewEvent")}
				</span>
				<div className="dateContainer">
					<span className={`date ${isTodaysDate ? "todaysDate" : ""}`}>
						{date.format("D")}
						{isTodaysDate && (
							<span className="visuallyHidden">
								{t("calendarGridCard.labels.todaysDate")}
							</span>
						)}
					</span>
				</div>
				<div
					className="clickable card-body"
					role="region"
					onClick={handleOpenModal}
					aria-label={!hasEvents ? t("calendarGridCard.labels.noEvents") : ""}
				>
					{hasEvents && (
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
