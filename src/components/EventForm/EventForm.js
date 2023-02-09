import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.scss";
import { useTranslation } from "react-i18next";

const EventForm = () => {
	const [formState, setFormState] = useState({});
	const { t } = useTranslation();

	const handleSubmit = (event) => {
		event.preventDefault(); //Prevent page refresh

		console.log("### Event submitted", { formState });
	};

	const handleInputChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		setFormState({
			...formState,
			[inputName]: value,
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="formSection" id="event-name-container">
				<label htmlFor="eventName" id="event-name-label">
					Event Name
				</label>
				<input
					type="text"
					name="eventName"
					value={formState.eventName || ""}
					onChange={handleInputChange}
					aria-labelledby="event-name-label"
				/>
			</div>
			<div className="formSection" id="event-date-container">
				<label htmlFor="startDate" id="start-date-label">
					Event Date (WIP)
				</label>
				<input
					type="date"
					name="startDate"
					value={formState.startDate || ""}
					onChange={handleInputChange}
					aria-labelledby="start-date-label"
				/>
			</div>
			<div className="formSection" id="event-time-container">
				<label htmlFor="time" id="event-time-label">
					Event Time (WIP) (Need start & optional end time)
				</label>
				<input
					type="text"
					name="time"
					value={formState.time || ""}
					onChange={handleInputChange}
					aria-labelledby="event-time-label"
				/>
			</div>
			<div className="formSection" id="event-frequency-container">
				<label htmlFor="frequency" id="event-frequency-label">
					Event Frequency (WIP)
				</label>
				<select
					name="frequency"
					onChange={handleInputChange}
					value={formState.frequency || ""}
					aria-labelledby="event-frequency-label"
				>
					<option value="noRepeat">
						{t("event.modal.form.repeat.noRepeat")}
					</option>
					<option value="daily">{t("event.modal.form.repeat.daily")}</option>
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
				<label htmlFor="location" id="event-location-label">
					Event Location
				</label>
				<input
					type="text"
					name="location"
					value={formState.location || ""}
					onChange={handleInputChange}
					aria-labelledby="event-location-label"
				/>
			</div>
			<div className="formSection" id="event-description">
				<label htmlFor="description" id="event-description-label">
					Event Description
				</label>
				<input
					type="text"
					name="description"
					value={formState.description || ""}
					onChange={handleInputChange}
					aria-labelledby="event-description-label"
				/>
			</div>
			<div
				className="formSection buttonBar"
				aria-label={t("event.modal.labels.formActions")}
				role="group"
			>
				<button type="submit" aria-label={t("event.modal.buttons.submit.hat")}>
					{t("event.modal.buttons.submit.text")}
				</button>
				<button aria-label={t("event.modal.buttons.reset.hat")}>
					{t("event.modal.buttons.reset.text")}
				</button>
			</div>
		</form>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
