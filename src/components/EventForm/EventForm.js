import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.scss";
import { useTranslation } from "react-i18next";
import { postEvent } from "reducers/calendarReducer";
import { useDispatch } from "react-redux";

const DEFAULT_FORM_STATE = {
	eventName: "",
	startDate: "",
	endDate: "",
	startTime: "",
	endTime: "",
	frequency: "",
	location: "",
	description: "",
};

const EventForm = () => {
	const [formState, setFormState] = useState(DEFAULT_FORM_STATE);
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleSubmit = (event) => {
		event.preventDefault(); //Prevent page refresh
		dispatch(postEvent(formState));
	};

	const handleInputChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		setFormState({
			...formState,
			[inputName]: value,
		});
	};

	const handleResetForm = (event) => {
		event.preventDefault();
		setFormState(DEFAULT_FORM_STATE);
	};

	return (
		<div data-testid="EventForm">
			<form onSubmit={handleSubmit}>
				<div className="formSection" id="name-container">
					<label htmlFor="eventName" id="name-label">
						Event Name
					</label>
					<input
						type="text"
						name="eventName"
						value={formState.eventName}
						onChange={handleInputChange}
						aria-labelledby="name-label"
					/>
				</div>
				<div className="formSection" id="date-container">
					<label htmlFor="startDate" id="start-date-label">
						Event Date (WIP)
					</label>
					<input
						type="date"
						name="startDate"
						value={formState.startDate}
						onChange={handleInputChange}
						aria-labelledby="start-date-label"
					/>
				</div>
				<div className="formSection" id="time-container">
					<label htmlFor="time" id="start-time-label">
						Event Time (WIP) (Need start & optional end time)
					</label>
					<input
						type="time"
						name="startTime"
						value={formState.startTime}
						onChange={handleInputChange}
						aria-labelledby="start-time-label"
					/>
				</div>
				<div className="formSection" id="frequency-container">
					<label htmlFor="frequency" id="frequency-label">
						Event Frequency (WIP)
					</label>
					<select
						name="frequency"
						onChange={handleInputChange}
						value={formState.frequency}
						aria-labelledby="frequency-label"
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
				<div className="formSection" id="location">
					<label htmlFor="location" id="location-label">
						Event Location
					</label>
					<input
						type="text"
						name="location"
						value={formState.location}
						onChange={handleInputChange}
						aria-labelledby="location-label"
					/>
				</div>
				<div className="formSection" id="description">
					<label htmlFor="description" id="description-label">
						Event Description
					</label>
					<input
						type="text"
						name="description"
						value={formState.description}
						onChange={handleInputChange}
						aria-labelledby="description-label"
					/>
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
					<button
						onClick={handleResetForm}
						aria-label={t("event.modal.buttons.reset.hat")}
					>
						{t("event.modal.buttons.reset.text")}
					</button>
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
