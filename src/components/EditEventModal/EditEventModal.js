import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./EditEventModal.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";
import EventForm from "components/EventForm/EventForm";
import { useDispatch } from "react-redux";
import { deleteEvent, updateEvent } from "../../reducers/calendarReducer";

const EditEventModal = (props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const defaultFormState = {
		eventName: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		description: "",
	};

	//Initialize formState with existing data from props.event
	const [formState, setFormState] = useState({
		...defaultFormState,
		...props.event,
	});

	const handleInputChange = (event) => {
		const inputName = event.target.name;
		const value = event.target.value;

		setFormState({
			...formState,
			[inputName]: value,
		});
	};

	const handleResetForm = () => {
		setFormState(defaultFormState);
	};

	const handleFormSubmit = () => {
		const updatedEvent = {
			...props.event,
			...formState,
		};
		delete updatedEvent.isStartOfButton;
		delete updatedEvent.buttonLength;

		dispatch(updateEvent(props.event, updatedEvent));
		props.onClose();
	};

	const handleDeleteEvent = () => {
		dispatch(deleteEvent(props.event));
		props.onClose();
	};

	const buttonContent = [
		{
			type: "submit",
			ariaLabel: t("eventModal.buttons.save.hat"),
			text: t("eventModal.buttons.save.text"),
			onClick: handleFormSubmit,
		},
		{
			type: "button",
			ariaLabel: t("eventModal.buttons.reset.hat"),
			text: t("eventModal.buttons.reset.text"),
			onClick: handleResetForm,
		},
		{
			type: "button",
			ariaLabel: t("eventModal.buttons.delete.hat"),
			text: t("eventModal.buttons.delete.text"),
			onClick: handleDeleteEvent,
		},
	];

	return (
		<div
			className="EditEventModal modalBackdrop"
			data-testid="EditEventModal"
			onClick={props.onClose}
		>
			<div className="modalContainer" onClick={(e) => e.stopPropagation()}>
				<div className="modalHeader">
					<span className="modalTitle">
						{t("eventModal.labels.editEventModal")}
					</span>
					<IconButton
						name="closeModal"
						ariaLabel={t("eventModal.labels.closeButton")}
						onClick={props.onClose}
					>
						<i className="bi bi-x-lg"></i>
					</IconButton>
				</div>
				<div className="modalBody">
					<EventForm
						formState={formState}
						handleInputChange={handleInputChange}
						buttonContent={buttonContent}
					></EventForm>
				</div>
			</div>
		</div>
	);
};

EditEventModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

EditEventModal.defaultProps = {};

export default EditEventModal;
