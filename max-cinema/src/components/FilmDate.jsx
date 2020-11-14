import React, { useRef, useState, useEffect, useCallback } from 'react';
import Calendar from './Calendar';
import moment from 'moment';
import 'moment/locale/ru';

const getDateObj = (date) => {
  moment.locale('ru');
  return moment(date).format('MM.DD.YYYY');
};

const FilmDate = React.memo(function ({ changeDate, date }) {
  const [isActive, setIsActive] = useState(false);
  const rootRef = useRef();

  useEffect(() => {
    let isMounted = false;
    document.addEventListener('click', (e) => {
      if (!e.path.includes(rootRef.current) && !isMounted) {
        setIsActive(false);
      }
    });

    return () => {
      isMounted = true;
    };
  }, []);

  const setDate = useCallback(
    (date) => {
      changeDate(date);
      setIsActive(false);
    },
    [changeDate],
  );

  const openCalendar = () => {
    setIsActive(!isActive);
  };

  return (
    <div ref={rootRef}>
      <div className="modal__date">
        <span>Дата:</span>
        <span onClick={openCalendar} className="date">
          {getDateObj(date)}
        </span>
      </div>
      <Calendar isActive={isActive} changeDate={setDate} isFilmPage />
    </div>
  );
});

export default FilmDate;
