import React from "react";
import PropTypes from "prop-types";
import styles from "./MultipleDateEvent.scss";

const MultipleDateEvent = (props) => {
	const { event } = props;

	const handleOnClick = () => {
		console.log("###", { event });
	};

	return (
		<div
			className={"SingleDateEvent"}
			data-testid="SingleDateEvent"
			onClick={(e) => {
				e.stopPropagation();
				handleOnClick();
			}}
		>
			{event.eventName}
		</div>
	);
};

MultipleDateEvent.propTypes = {};

MultipleDateEvent.defaultProps = {};

export default MultipleDateEvent;
