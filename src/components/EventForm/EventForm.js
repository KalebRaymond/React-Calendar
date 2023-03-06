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
						{t("eventForm.labels.name")}
					</label>
					<input
						type="text"
						name="eventName"
						value={formState.Name}
						onChange={handleInputChange}
						aria-labelledby="name-label"
					/>
				</div>
				<div className="formSection" id="start-date-container">
					<label htmlFor="startDate" id="start-date-label">
						{t("eventForm.labels.startDate")}
					</label>
					<input
						type="date"
						name="startDate"
						value={formState.startDate}
						onChange={handleInputChange}
						aria-labelledby="start-date-label"
					/>
				</div>
				<div className="formSection" id="end-date-container">
					<label htmlFor="startDate" id="end-date-label">
						{t("eventForm.labels.endDate")}
					</label>
					<input
						type="date"
						name="endDate"
						value={formState.endDate}
						onChange={handleInputChange}
						aria-labelledby="end-date-label"
					/>
				</div>
				<div className="formSection" id="start-time-container">
					<label htmlFor="time" id="start-time-label">
						{t("eventForm.labels.startTime")}
					</label>
					<input
						type="time"
						name="startTime"
						value={formState.startTime}
						onChange={handleInputChange}
						aria-labelledby="start-time-label"
					/>
				</div>
				<div className="formSection" id="end-time-container">
					<label htmlFor="time" id="end-time-label">
						{t("eventForm.labels.endTime")}
					</label>
					<input
						type="time"
						name="endTime"
						value={formState.endTime}
						onChange={handleInputChange}
						aria-labelledby="end-time-label"
					/>
				</div>
				<div className="formSection" id="description">
					<label htmlFor="description" id="description-label">
						{t("eventForm.labels.description")}
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
					aria-label={t("eventModal.labels.formActions")}
					role="group"
				>
					<button type="submit" aria-label={t("eventModal.buttons.submit.hat")}>
						{t("eventModal.buttons.submit.text")}
					</button>
					<button
						onClick={handleResetForm}
						aria-label={t("eventModal.buttons.reset.hat")}
					>
						{t("eventModal.buttons.reset.text")}
					</button>
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {};

EventForm.defaultProps = {};

export default EventForm;
