import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./CreateEventModal.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";
import EventForm from "components/EventForm/EventForm";
import { postEvent } from "reducers/calendarReducer";
import { useDispatch } from "react-redux";

const CreateEventModal = (props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const handleFormSubmit = (formState) => {
		dispatch(postEvent(formState));
		props.onClose();
	};

	const defaultFormState = {
		eventName: "",
		startDate: "",
		endDate: "",
		startTime: "",
		endTime: "",
		description: "",
	};

	const [formState, setFormState] = useState({
		...defaultFormState,
		startDate: props.initialDate.format("YYYY-MM-DD"),
		endDate: props.initialDate.format("YYYY-MM-DD"),
	});

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
		setFormState(defaultFormState);
	};

	const buttonContent = [
		{
			type: "submit",
			ariaLabel: t("eventModal.buttons.submit.hat"),
			text: t("eventModal.buttons.submit.text"),
			onClick: () => handleFormSubmit(formState),
		},
		{
			type: "reset",
			ariaLabel: t("eventModal.buttons.reset.hat"),
			text: t("eventModal.buttons.reset.text"),
			onClick: handleResetForm,
		},
	];

	return (
		<div
			className="CreateEventModal modalBackdrop"
			data-testid="CreateEventModal"
			onClick={props.onClose}
		>
			<div
				className="modalContainer"
				aria-label={t("eventModal.labels.createEventModal")}
				onClick={(e) => e.stopPropagation()}
			>
				<div className="modalHeader">
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

CreateEventModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

CreateEventModal.defaultProps = {};

export default CreateEventModal;
