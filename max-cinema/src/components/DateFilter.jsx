import React, { useRef, useState, useEffect, useCallback } from 'react';
import Calendar from './Calendar';
import moment from 'moment';
import 'moment/locale/ru';

const getDateObj = (date) => {
  moment.locale('ru');
  return moment(date).format('MMM Do YYYY');
};

const DateFilter = React.memo(function ({ changeDate, date }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedDate, setSelectedDate] = useState(getDateObj(date));
  const rootRef = useRef();

  useEffect(() => {
    let isMount = false;
    document.addEventListener('click', (e) => {
      if (!e.path.includes(rootRef.current) && !isMount) {
        setIsActive(false);
      }
    });

    return () => {
      isMount = true;
    };
  }, []);

  const setDate = useCallback(
    (date) => {
      changeDate(date);
      setSelectedDate(getDateObj(date));
    },
    [changeDate],
  );

  const openCalendar = () => {
    setIsActive(!isActive);
  };

  return (
    <div ref={rootRef}>
      <input
        placeholder="Дата"
        className="date__input"
        type="text"
        onClick={openCalendar}
        value={selectedDate}
        readOnly
      />
      <Calendar isActive={isActive} changeDate={setDate} />
    </div>
  );
});

export default DateFilter;
