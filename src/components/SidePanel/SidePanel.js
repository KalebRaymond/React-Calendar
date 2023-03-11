import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./SidePanel.scss";
import { ThemeContext } from "context/ThemeContext";

const SidePanel = () => {
	const { theme } = useContext(ThemeContext);

	return (
		<div
			className={`SidePanel ${theme === "light" ? "light" : "dark"}`}
			data-testid="SidePanel"
		></div>
	);
};

SidePanel.propTypes = {};

SidePanel.defaultProps = {};

export default SidePanel;
