import React, { useContext } from "react";
import "./CalendarToolbar.scss";
import IconButton from "components/IconButton/IconButton";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { incrementMonth, decrementMonth } from "../../reducers/calendarReducer";
import moment from "moment";
import TranslationService from "services/TranslationService";
import { ThemeContext } from "context/ThemeContext";
import ThemeToggleButton from "components/ThemeToggleButton/ThemeToggleButton";

const CalendarToolbar = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { theme } = useContext(ThemeContext);

	const focusedMonth = useSelector((state) => {
		const monthIndex = moment(state.calendar.focusedDate).month();
		return TranslationService.getMonthTranslation(monthIndex);
	});

	const focusedYear = useSelector((state) =>
		moment(state.calendar.focusedDate).year()
	);

	const handleLeftNavClick = () => {
		dispatch(decrementMonth());
	};

	const handleRightNavClick = () => {
		dispatch(incrementMonth());
	};

	return (
		<div
			className={`CalendarToolbar ${theme === "light" ? "light" : "dark"}`}
			data-testid="CalendarToolbar"
		>
			<div className="toolbarSection" id="calendarLabelContainer">
				<div id="calendarLabel">
					<span>{t("calendarToolbar.calendarLabel")}</span>
				</div>
			</div>
			<div className="toolbarSection" id="controlsContainer">
				<div className="monthYear">
					<span>{`${focusedMonth} ${focusedYear}`}</span>
				</div>
				<div className="calendarButtons">
					<div className="toggleThemeButton">
						<ThemeToggleButton />
					</div>
					<div
						className="navButtons"
						role="group"
						aria-label={t("calendarToolbar.mainControls")} /*Necessary?*/
					>
						<IconButton
							name="prevMonth"
							ariaLabel={t("calendarToolbar.leftNavButton")}
							onClick={handleLeftNavClick}
						>
							<i className="bi bi-chevron-left"></i>
						</IconButton>
						<IconButton
							name="nextMonth"
							ariaLabel={t("calendarToolbar.rightNavButton")}
							onClick={handleRightNavClick}
						>
							<i className="bi bi-chevron-right"></i>
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

CalendarToolbar.propTypes = {};

CalendarToolbar.defaultProps = {};

export default CalendarToolbar;
