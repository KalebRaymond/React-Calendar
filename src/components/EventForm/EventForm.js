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
							aria-label={button.ariaLabel}
							className={`btn ${
								button.type === "submit" ? "btn-primary" : "btn-secondary"
							}`}
							id={button.id}
							key={`${button.text}-${i}`}
							onClick={button.onClick}
							type={button.type}
						>
							{button.text}
						</button>
					);
			  })
			: [];
	};

	return (
		<div className="EventForm" data-testid="EventForm">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
				aria-label={t("eventForm.labels.form")}
			>
				<div className="formSection" id="name-container">
					<div className="inputContainer" aria-labelledby="name-label">
						<label htmlFor="eventName" id="name-label">
							{t("eventForm.labels.name")}
						</label>
						<input
							type="text"
							name="eventName"
							id="eventName"
							value={props.formState.eventName}
							onChange={props.handleInputChange}
						/>
					</div>
				</div>
				<div className="formSection input" id="dates-container">
					<div className="inputContainer" aria-labelledby="start-date-label">
						<label htmlFor="startDate" id="start-date-label">
							{t("eventForm.labels.startDate")}
						</label>
						<input
							type="date"
							name="startDate"
							id="startDate"
							value={props.formState.startDate}
							onChange={props.handleInputChange}
						/>
					</div>
					<div className="hyphen">
						<span>-</span>
					</div>
					<div className="inputContainer" aria-labelledby="end-date-label">
						<label htmlFor="startDate" id="end-date-label">
							{t("eventForm.labels.endDate")}
						</label>
						<input
							type="date"
							name="endDate"
							id="endDate"
							value={props.formState.endDate}
							onChange={props.handleInputChange}
						/>
					</div>
				</div>
				<div className="formSection" id="time-container">
					<div className="inputContainer" aria-labelledby="start-time-label">
						<label htmlFor="time" id="start-time-label">
							{t("eventForm.labels.startTime")}
						</label>
						<input
							type="time"
							name="startTime"
							id="startTime"
							value={props.formState.startTime}
							onChange={props.handleInputChange}
						/>
					</div>
					<div className="hyphen">
						<span>-</span>
					</div>
					<div className="inputContainer" aria-labelledby="end-time-label">
						<label htmlFor="time" id="end-time-label">
							{t("eventForm.labels.endTime")}
						</label>
						<input
							type="time"
							name="endTime"
							id="endTime"
							value={props.formState.endTime}
							onChange={props.handleInputChange}
						/>
					</div>
				</div>
				<div className="formSection" id="description-container">
					<div className="inputContainer" aria-labelledby="description-label">
						<label htmlFor="description" id="description-label">
							{t("eventForm.labels.description")}
						</label>
						<textarea
							name="description"
							id="description"
							value={props.formState.description}
							onChange={props.handleInputChange}
						/>
					</div>
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
