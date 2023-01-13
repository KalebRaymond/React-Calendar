import React from "react";
import PropTypes from "prop-types";
import styles from "./CalendarGridRow.module.scss";

const CalendarGridRow = (props) => (
	<div
		key={props.keyProp}
		className={styles.CalendarGridRow}
		data-testid="CalendarGridRow"
	>
		{props.children}
	</div>
);

CalendarGridRow.propTypes = {};

CalendarGridRow.defaultProps = {};

export default CalendarGridRow;
