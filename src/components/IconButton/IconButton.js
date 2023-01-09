import React from "react";
import PropTypes from "prop-types";
import styles from "./IconButton.module.scss";

const IconButton = (props) => (
	<div className={styles.IconButton} data-testid="IconButton">
		<button
			name={props.name}
			aria-label={props.ariaLabel}
			className="btn btn-secondary"
			onClick={props.onClick}
		>
			{props.children}
		</button>
	</div>
);

IconButton.propTypes = {};

IconButton.defaultProps = {};

export default IconButton;
