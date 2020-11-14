import React from 'react';
import ClassNames from 'class-names';
import moment from 'moment';

const Calendar = React.memo(function ({ isActive, changeDate, isFilmPage }) {
  const [activeDate, setActiveDate] = React.useState({
    day: moment(),
    date: moment(),
  });

  const days = Array(activeDate.date.daysInMonth())
    .fill(0)
    .map((_, index) => index + 1);

  const onChangeMonth = (isNext) => {
    isNext
      ? setActiveDate((prev) => ({
          ...activeDate,
          date: prev.date.add({ month: 1 }),
        }))
      : setActiveDate((prev) => ({
          ...activeDate,
          date: prev.date.subtract({ month: 1 }),
        }));
  };

  const onChangeDay = (selectedDay) => {
    const day = moment().set({
      date: selectedDay,
      month: activeDate.date.month(),
    });
    setActiveDate(() => ({
      ...activeDate,
      day,
    }));
    changeDate(day);
  };

  const isEnable = (item) => {
    return moment().isAfter(activeDate.date.set({ date: item })) && moment().date() !== item;
  };

  return (
    <div
      className={ClassNames('calendar', {
        active: isActive,
        film_page: isFilmPage,
      })}>
      <div className="calendar__head">
        <svg className="arrow left" viewBox="0 0 5 9" onClick={() => onChangeMonth(false)}>
          <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" />
        </svg>
        <div className="date">{`${activeDate.date.format('MMMM')} ${activeDate.date.format(
          'YYYY',
        )}`}</div>
        <svg className="arrow" viewBox="0 0 5 9" onClick={() => onChangeMonth(true)}>
          <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" />
        </svg>
      </div>
      <hr />
      <div className="calendar__days">
        {days.map((item) => (
          <div
            key={item}
            className={ClassNames('day', {
              active:
                activeDate.day.month() === activeDate.date.month() &&
                item === activeDate.day.date(),
              notEnabled: isEnable(item),
            })}
            onClick={() => onChangeDay(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Calendar;
