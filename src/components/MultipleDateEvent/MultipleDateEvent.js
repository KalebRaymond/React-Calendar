import React from "react";
import PropTypes from "prop-types";
import styles from "./MultipleDateEvent.scss";

const MultipleDateEvent = (props) => {
	const { event } = props;

	const handleOnClick = () => {
		console.log("###", { event });
	};

	const renderEventButton = () => {
		return event.isStartOfButton ? (
			<div
				className="eventBtn multiDateEventBtn"
				style={{ width: `calc((100% * ${event.buttonLength}  - 0.15rem)` }} //Need to subtract 2 * 0.15rem margin
			>
				<span className="eventName">{event.eventName}</span>
			</div>
		) : (
			<div className="eventBtn placeholderEventBtn"></div>
		);
	};

	return (
		<div
			className={"MultipleDateEvent"}
			data-testid="MultipleDateEvent"
			onClick={(e) => {
				e.stopPropagation();
				handleOnClick();
			}}
		>
			{renderEventButton()}
		</div>
	);
};

MultipleDateEvent.propTypes = {};

MultipleDateEvent.defaultProps = {};

export default MultipleDateEvent;
