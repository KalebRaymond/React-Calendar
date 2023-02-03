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
			<div className="modalContainer">
				<div className="modalHeader">
					<IconButton
						name="closeModal"
						ariaLabel={t("event.modal.labels.close")}
						onClick={props.onClose}
					>
						<i className="bi bi-x-lg"></i>
					</IconButton>
				</div>
				<div className="modalBody">CreateEventModal Component</div>
			</div>
		</div>
	);
};

CreateEventModal.propTypes = {
	onClose: PropTypes.func.isRequired,
};

CreateEventModal.defaultProps = {};

export default CreateEventModal;
