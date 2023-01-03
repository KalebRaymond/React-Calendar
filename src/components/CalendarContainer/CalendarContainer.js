import React, { useEffect, useState } from 'react';
import styles from './CalendarContainer.module.scss';

import CalendarGrid from 'components/CalendarGrid/CalendarGrid';
import CalendarToolbar from 'components/CalendarToolbar/CalendarToolbar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';


const CalendarContainer = () => {
  const {t} = useTranslation();
  ///Decouple these for testing purposes?
  ///Also convert these to redux state
  //The date currently being viewed in the calendar
  const [focusedDate, setFocusedDate] = useState(moment());
  //The current date in real life
  const [todaysDate, setTodaysDate] = useState(moment());

  ///useState(0)? Need to check types
  const [focusedMonth, setFocusedMonth] = useState('');
  const [focusedYear, setFocusedYear] = useState(0);

  const getMonthTranslation = (month) => {
    switch (month) {
      case 0 : return t('months.january');
      case 1 : return t('months.february');
      case 2 : return t('months.march');
      case 3 : return t('months.april');
      case 4 : return t('months.may');
      case 5 : return t('months.june');
      case 6 : return t('months.july');
      case 7 : return t('months.august');
      case 8 : return t('months.september');
      case 9 : return t('months.october');
      case 10 : return t('months.november');
      case 11 : return t('months.december');
      default : return '';
    }

  }

  useEffect(() => {
    const month = focusedDate.month();
    setFocusedMonth(getMonthTranslation(month).toUpperCase());
    ///Need to translate month using useTranslation

    const year = focusedDate.year();
    setFocusedYear(year);
    
  }, [focusedDate])
  
  return(<div className={styles.CalendarContainer} data-testid="CalendarContainer">
    <CalendarToolbar currentMonth={focusedMonth} currentYear={focusedYear}></CalendarToolbar>
    <CalendarGrid calendarDates={[1, 2, 3]}></CalendarGrid>
  </div>)
};

CalendarContainer.propTypes = {};

CalendarContainer.defaultProps = {};

export default CalendarContainer;