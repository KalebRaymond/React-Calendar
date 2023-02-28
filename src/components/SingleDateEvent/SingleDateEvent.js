import React from "react";
import PropTypes from "prop-types";
import styles from "./SingleDateEvent.scss";

const SingleDateEvent = (props) => {
	const { event } = props;

	const handleOnClick = () => {
		console.log("###", { event });
	};

	return (
		<div
			className="SingleDateEvent"
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

SingleDateEvent.propTypes = {};

SingleDateEvent.defaultProps = {};

export default SingleDateEvent;
