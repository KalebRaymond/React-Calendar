import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './WeekDaysHeader.module.scss';

const WeekDaysHeader = () => {
  const {t} = useTranslation();

  const days = [
    t('days.sun'),
    t('days.mon'),
    t('days.tue'),
    t('days.wed'),
    t('days.thu'),
    t('days.fri'),
    t('days.sat')
  ];

  const renderDays = () => {
    return days.map((day, i) => {
      return <div className="weekDay" key={i}>{day}</div>
    });
  }

  return (<div className={styles.WeekDaysHeader} data-testid="WeekDaysHeader">
    {renderDays()}
  </div>);
};

WeekDaysHeader.propTypes = {};

WeekDaysHeader.defaultProps = {};

export default WeekDaysHeader;
