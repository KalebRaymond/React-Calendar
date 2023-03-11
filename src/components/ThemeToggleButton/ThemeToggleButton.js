import React, { useContext } from "react";
import PropTypes from "prop-types";
import styles from "./ThemeToggleButton.scss";
import { ThemeContext } from "../../context/ThemeContext";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";

const ThemeToggleButton = () => {
	const { theme, toggleTheme } = useContext(ThemeContext);
	const { t } = useTranslation();
	const ariaLabel =
		theme === "light"
			? t("themeToggleButton.light")
			: t("themeToggleButton.dark");

	return (
		<div className={"ThemeToggleButton"} data-testid="ThemeToggleButton">
			<IconButton
				name="themeToggle"
				ariaLabel={ariaLabel}
				onClick={toggleTheme}
			>
				{theme === "light" ? (
					<i className="bi bi-moon-fill"></i>
				) : (
					<i className="bi bi-sun-fill"></i>
				)}
			</IconButton>
		</div>
	);
};
ThemeToggleButton.propTypes = {};

ThemeToggleButton.defaultProps = {};

export default ThemeToggleButton;
