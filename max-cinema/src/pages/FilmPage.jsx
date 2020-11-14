import React from 'react';
import moment from 'moment';
import { FilmDate, PlacesList, SessionTime, TicketsCart } from '../components';

import {
  fetchFilm,
  setActiveTime,
  addSelectedTicket,
  clearSelectedTickets,
  removeSelectedTicket,
  clearState,
  setActiveDate,
} from '../redux/actions/activeFilm';
import { useDispatch, useSelector } from 'react-redux';
import CoverScreen from '../components/CoverScreen';

function FilmPage({ location }) {
  const dispatch = useDispatch();
  const {
    film,
    isLoaded,
    activeTime,
    activePlaces,
    totalCount,
    totalPrice,
    selectedTickets,
    activeDate,
  } = useSelector(({ activeFilm }) => ({
    film: activeFilm.film,
    activeTime: activeFilm.activeTime,
    activePlaces: activeFilm.selectedTickets.map((item) => item.place),
    totalPrice: activeFilm.totalPrice,
    totalCount: activeFilm.totalCount,
    selectedTickets: activeFilm.selectedTickets,
    activeDate: activeFilm.activeDate,
    isLoaded: activeFilm.isLoaded,
  }));
  const [isCoverScreenActive, setIsCoverScreenActive] = React.useState(false);

  React.useEffect(() => {
    if (location.id) dispatch(fetchFilm(location.id));

    return () => {
      dispatch(clearState());
    };
  }, [dispatch, location.id]);

  const setDate = (date) => {
    dispatch(setActiveDate(date));
    dispatch(clearSelectedTickets());
    dispatch(setActiveTime(null));
  };

  const setCoverScreenActive = () => {
    setIsCoverScreenActive((prev) => !prev);
  };

  const changeActiveTime = (time) => {
    dispatch(setActiveTime(time));
    dispatch(clearSelectedTickets());
  };

  const onPlaceClick = (selectedPlace) => {
    if (activePlaces.includes(selectedPlace)) {
      removeTicket(selectedPlace);
      return;
    }
    if (totalCount === 5) {
      setIsCoverScreenActive(true);
      return;
    }
    dispatch(addSelectedTicket(selectedPlace, 220));
  };

  const removeTicket = React.useCallback((selectedPlace) => {
    dispatch(removeSelectedTicket(selectedPlace, 220));
  }, []);

  const { availableTime, hallObj } = React.useMemo(() => {
    const activeObj = { availableTime: [], hallObj: {} };
    const formatDate = moment(activeDate).format('YYYY-MM-DD');

    if (isLoaded) {
      film['availableSessions'].forEach((item) => {
        if (item['date'] == formatDate) {
          item['sessions'].forEach((item) => {
            activeObj.availableTime.push(item['time']);
            if (item['time'] == activeTime) {
              activeObj.hallObj = item['hall'];
            }
          });
        }
      });
    }
    return activeObj;
  }, [film, activeDate, activeTime]);

  return (
    <div className="main-content">
      <div className="container">
        {isLoaded ? (
          <div className="main-content__content">
            <CoverScreen isActive={isCoverScreenActive} setIsActive={setCoverScreenActive} />
            <div className="modal__head">
              <div className="modal__info">
                <div className="modal__film-name">{film.name}</div>
                <div className="modal__rating">{film.age_rating}+</div>
                <ul className="modal__genres">
                  {film.genres &&
                    film.genres.map((item, index) => (
                      <li className="genres__item" key={`${item}_${index}`}>
                        {item}
                      </li>
                    ))}
                </ul>
              </div>
              <FilmDate date={activeDate} changeDate={setDate} />
              <SessionTime
                timeArray={availableTime}
                activeElement={activeTime}
                onSetActiveTime={changeActiveTime}
              />
            </div>
            {activeTime ? (
              <div className="modal__main">
                <span>Выберите место:</span>
                <PlacesList
                  cinemaHall={hallObj}
                  onPlaceClick={onPlaceClick}
                  activePlaces={activePlaces}
                />
              </div>
            ) : (
              <div className="modal__main">
                <div className="modal__main__choose-time">
                  <h1>Выберите время</h1>
                </div>
              </div>
            )}
            <hr />
            <div className="modal__footer">
              <div className="ticket-price">
                Цена билета:
                <span> 220 рублей</span>
              </div>
              <TicketsCart
                activeTime={activeTime}
                totalCount={totalCount}
                totalPrice={totalPrice}
                activeDate={activeDate}
                selectedTickets={selectedTickets}
                removeTicket={removeTicket}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default FilmPage;
