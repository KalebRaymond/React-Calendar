import React, { createRef, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./SingleDateEvent.scss";
import EditEventModal from "../EditEventModal/EditEventModal";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../context/ThemeContext";

const SingleDateEvent = (props) => {
	const { event } = props;
	const [showModal, setShowModal] = useState(false);
	const { t } = useTranslation();
	const { theme } = useContext(ThemeContext);
	const buttonRef = createRef();

	//Set focus on event button when modal is closed
	useEffect(() => {
		if (!showModal) {
			console.log("### buttonRef", { buttonRef });
			buttonRef.current?.focus();
		}
	}, [showModal]);

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
			tabIndex="0"
			ref={buttonRef}
			aria-label={t("event.labels.singleDateEvent", {
				eventName: event.eventName,
				startTime: convertTo12HourTime(event.startTime),
				startDate: event.startDate,
			})}
		>
			<div className={`content ${theme === "light" ? "light" : "dark"}`}>
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
