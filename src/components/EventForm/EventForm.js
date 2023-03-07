import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./EventForm.scss";
import { useTranslation } from "react-i18next";

const EventForm = (props) => {
	const { t } = useTranslation();

	const renderButtons = () => {
		return props.buttonContent
			? props.buttonContent.map((button, i) => {
					return (
						<button
							type={button.type}
							aria-label={button.ariaLabel}
							onClick={button.onClick}
							key={`${button.text}-${i}`}
						>
							{button.text}
						</button>
					);
			  })
			: [];
	};

	return (
		<div data-testid="EventForm">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="formSection" id="name-container">
					<label htmlFor="eventName" id="name-label">
						{t("eventForm.labels.name")}
					</label>
					<input
						type="text"
						name="eventName"
						value={props.formState.Name}
						onChange={props.handleInputChange}
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
						value={props.formState.startDate}
						onChange={props.handleInputChange}
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
						value={props.formState.endDate}
						onChange={props.handleInputChange}
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
						value={props.formState.startTime}
						onChange={props.handleInputChange}
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
						value={props.formState.endTime}
						onChange={props.handleInputChange}
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
						value={props.formState.description}
						onChange={props.handleInputChange}
						aria-labelledby="description-label"
					/>
				</div>
				<div
					className="formSection buttonBar"
					aria-label={t("eventModal.labels.formActions")}
					role="group"
				>
					{renderButtons()}
				</div>
			</form>
		</div>
	);
};

EventForm.propTypes = {
	formState: PropTypes.object.isRequired,
	handleInputChange: PropTypes.func.isRequired,
	buttonContent: PropTypes.array.isRequired,
};

EventForm.defaultProps = {};

export default EventForm;
