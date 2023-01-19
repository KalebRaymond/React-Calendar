import React from "react";
import PropTypes from "prop-types";
import styles from "./CreateEventModal.scss";

const CreateEventModal = () => (
	<div
		className="CreateEventModal"
		id="modal-backdrop"
		data-testid="CreateEventModal"
	>
		<div id="modal-body">CreateEventModal Component</div>
	</div>
);

CreateEventModal.propTypes = {};

CreateEventModal.defaultProps = {};

export default CreateEventModal;
