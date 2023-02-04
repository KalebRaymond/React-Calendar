import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateEventModal.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";

const CreateEventModal = (props) => {
	const { t } = useTranslation();

	return (
		<div
			className="CreateEventModal modalBackdrop"
			data-testid="CreateEventModal"
		>
			<div
				className="modalContainer"
				aria-label={t("event.modal.labels.createEventModal")}
			>
				<div className="modalHeader">
					<IconButton
						name="closeModal"
						ariaLabel={t("event.modal.labels.closeButton")}
						onClick={props.onClose}
					>
						<i className="bi bi-x-lg"></i>
					</IconButton>
				</div>
				<div className="modalBody">
					{/* TODO - Make components for form, make accessible, rename classes */}
					<form>
						<div className="formSection" id="event-name-container">
							<label for="eventName" id="event-name">
								Event Name
							</label>
							<input
								type="text"
								name="eventName"
								aria-labelledby="event-name"
							/>
						</div>
						<div className="formSection" id="event-date-container">
							<label for="eventDate" id="event-date">
								Event Date (WIP)
							</label>
							<input
								type="date"
								name="eventDate"
								aria-labelledby="event-date"
							/>
						</div>
						<div className="formSection" id="event-time-container">
							<label for="eventTimee" id="event-time">
								Event Time (WIP)
							</label>
							<input
								type="text"
								name="eventTime"
								aria-labelledby="event-time"
							/>
						</div>
						<div className="formSection" id="event-repeat-container">
							<label for="eventRepeat" id="event-repeat">
								Event Repeat (WIP)
							</label>
							<select name="eventRepeat" aria-labelledby="event-repeat">
								<option value="noRepeat">
									{t("event.modal.form.repeat.noRepeat")}
								</option>
								<option value="daily">
									{t("event.modal.form.repeat.daily")}
								</option>
								<option value="weekly">
									{t("event.modal.form.repeat.weekly", {
										dayOfWeek: "TESTDAY",
									})}
								</option>
								<option value="monthly">
									{t("event.modal.form.repeat.monthly", {
										count: "1st",
										dayOfWeek: "TESTDAY",
									})}
								</option>
								<option value="annually">
									{t("event.modal.form.repeat.annually", { date: "TESTDATE" })}
								</option>
								<option value="weekdays">
									{t("event.modal.form.repeat.weekdays")}
								</option>
							</select>
						</div>
						<div className="formSection" id="event-location">
							<label for="eventLocation">Event Location</label>
							<input type="text" name="eventLocation" />
						</div>
						<div className="formSection" id="event-description">
							<label for="eventDescription">Event Description</label>
							<input type="text" name="eventDescription" />
						</div>
						<div
							className="formSection buttonBar"
							aria-label={t("event.modal.labels.formActions")}
							role="group"
						>
							<button
								type="submit"
								aria-label={t("event.modal.buttons.submit.hat")}
							>
								{t("event.modal.buttons.submit.text")}
							</button>
							<button aria-label={t("event.modal.buttons.reset.hat")}>
								{t("event.modal.buttons.reset.text")}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

CreateEventModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

CreateEventModal.defaultProps = {};

export default CreateEventModal;
