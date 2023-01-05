import React, { useEffect, useState } from 'react';
import styles from './CalendarContainer.module.scss';

import CalendarGrid from 'components/CalendarGrid/CalendarGrid';
import CalendarToolbar from 'components/CalendarToolbar/CalendarToolbar';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';


const CalendarContainer = () => {
  const {t} = useTranslation();

  //The current date in real life
  const [todaysDate, setTodaysDate] = useState(moment());

  //The current month and year on the calendar that is being viewed
  ///Not updating on calendar probably because focusedDate is not serializable
  ///Works fine if useEffect includes state.calendar.testValue as a dependency
  const focusedDate = useSelector(state => state.calendar.focusedDate);
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
    console.log("### focusedDate", focusedDate);

    const month = focusedDate?.month();
    setFocusedMonth(getMonthTranslation(month).toUpperCase());

    const year = focusedDate?.year();
    setFocusedYear(year);
    
  }, [focusedDate])
  
  return(<div className={styles.CalendarContainer} data-testid="CalendarContainer">
    <CalendarToolbar currentMonth={focusedMonth} currentYear={focusedYear}></CalendarToolbar>
    <CalendarGrid calendarDates={[1, 2, 3]}></CalendarGrid>
  </div>)
};

export default CalendarContainer;