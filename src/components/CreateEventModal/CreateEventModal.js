import { postEvent } from "reducers/calendarReducer";
import { ThemeContext } from "context/ThemeContext";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import EventForm from "components/EventForm/EventForm";
import FocusTrap from "focus-trap-react";
import IconButton from "components/IconButton/IconButton";
import PropTypes from "prop-types";
import React, { useContext, useState } from "react";
import styles from "./CreateEventModal.scss";

const CreateEventModal = (props) => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);
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
		startDate: props.initialStartDate,
		endDate: props.initialEndDate,
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
		dispatch(postEvent(formState));
		props.onClose();
	};

	const buttonContent = [
		{
			type: "submit",
			ariaLabel: t("eventModal.buttons.submit.hat"),
			text: t("eventModal.buttons.submit.text"),
			onClick: handleFormSubmit,
		},
		{
			type: "button",
			ariaLabel: t("eventModal.buttons.reset.hat"),
			text: t("eventModal.buttons.reset.text"),
			onClick: handleResetForm,
		},
	];

	return (
		<FocusTrap>
			<div
				className={`CreateEventModal modalBackdrop ${
					theme === "light" ? "light" : "dark"
				}`}
				data-testid="CreateEventModal"
				onClick={props.onClose}
			>
				<div
					className={`modalContainer ${theme === "light" ? "light" : "dark"}`}
					onClick={(e) => e.stopPropagation()}
					aria-label={t("eventModal.labels.createEventModal")}
					role="dialog"
				>
					<header className="modalHeader">
						<span className="modalTitle">
							{t("eventModal.labels.createEventModal")}
						</span>
						<IconButton
							name="closeModal"
							ariaLabel={t("eventModal.labels.closeButton")}
							onClick={props.onClose}
						>
							<i className="bi bi-x-lg"></i>
						</IconButton>
					</header>
					<div className="modalBody">
						<EventForm
							formState={formState}
							handleInputChange={handleInputChange}
							buttonContent={buttonContent}
						></EventForm>
					</div>
				</div>
			</div>
		</FocusTrap>
	);
};

CreateEventModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

CreateEventModal.defaultProps = {};

export default CreateEventModal;
