import React from 'react';
import classNames from 'class-names';

function PlacesList({ cinemaHall, onPlaceClick, activePlaces }) {
  const rowObject = React.useMemo(() => {
    const rowsObj = {};
    rowsObj['rowNumbers'] = Array(+cinemaHall.totalNumberOfSeats.split(':')[1])
      .fill(0)
      .map((_, index) => index + 1);
    rowsObj['row'] = Array(+cinemaHall.totalNumberOfSeats.split(':')[0])
      .fill(0)
      .map((_, index) => index + 1);
    return rowsObj;
  }, [cinemaHall]);

  return (
    <div className="modal__places-list">
      <div className="row-list left">
        {rowObject.rowNumbers.map((item) => (
          <div className="row-number" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="places-list">
        {rowObject.rowNumbers.map((rowItem) => (
          <div className="row" key={rowItem}>
            {rowObject.row.map((item) => (
              <div
                className={classNames('place', {
                  occupied: cinemaHall['reservedSeats'].includes(`${rowItem}:${item}`),
                  active: activePlaces.includes(`${rowItem}:${item}`),
                })}
                key={item}
                onClick={() => onPlaceClick(`${rowItem}:${item}`)}>
                {item}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="row-list left">
        {rowObject.rowNumbers.map((item) => (
          <div className="row-number" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesList;
