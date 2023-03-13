import React from "react";
import PropTypes from "prop-types";
import styles from "./IconButton.scss";

const IconButton = (props) => (
	<div className="IconButton" data-testid="IconButton">
		<button
			name={props.name}
			aria-label={props.ariaLabel}
			className="btn btn-secondary"
			onClick={props.onClick}
			ref={props.buttonRef}
		>
			{props.children}
		</button>
	</div>
);

IconButton.propTypes = {};

IconButton.defaultProps = {};

export default IconButton;
