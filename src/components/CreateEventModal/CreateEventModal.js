import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateEventModal.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";
import EventForm from "components/EventForm/EventForm";

const CreateEventModal = (props) => {
	const { initialDate, onClose } = props;
	const { t } = useTranslation();

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
						onClick={onClose}
					>
						<i className="bi bi-x-lg"></i>
					</IconButton>
				</div>
				<div className="modalBody">
					<EventForm
						initialDate={initialDate}
						handleCloseModal={props.onClose}
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
