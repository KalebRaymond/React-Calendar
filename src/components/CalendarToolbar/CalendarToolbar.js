import React from 'react';
import './CalendarToolbar.scss';
import IconButton from 'components/IconButton/IconButton';
import { useTranslation } from 'react-i18next';

import { useDispatch } from 'react-redux'
import { incrementMonth, decrementMonth } from '../../reducers/calendarReducer'

const CalendarToolbar = (props) => {
  const {
    currentMonth,
    currentYear
  } = props;
  
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const handleLeftNavClick = () => {
    dispatch(decrementMonth());
  }

  const handleRightNavClick = () => { 
    dispatch(incrementMonth());
  }

  return (<div className={"CalendarToolbar"} data-testid="CalendarToolbar">
    <div className="toolbarSection" id="month-year">
      <span>{`${currentMonth} ${currentYear}`}</span>
    </div>
    <div className="toolbarSection" id="nav-buttons">
      <IconButton ariaLabel={t('calendarToolbar.leftNavButton')} onClick={handleLeftNavClick}>
        <i className="bi bi-chevron-left"></i>
      </IconButton>
      <IconButton ariaLabel={t('calendarToolbar.rightNavButton')} onClick={handleRightNavClick}>
        <i className="bi bi-chevron-right"></i>
      </IconButton>
    </div>
  </div>);
};

CalendarToolbar.propTypes = {};

CalendarToolbar.defaultProps = {};

export default CalendarToolbar;
