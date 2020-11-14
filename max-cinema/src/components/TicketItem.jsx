import React from 'react';
import moment from 'moment';

function TicketItem({ row, place, date, time, onRemoveClick }) {
  return (
    <div className="ticket-item">
      <div className="place-info">
        <div className="row">Ряд: {row}</div>
        <div className="place">Место: {place}</div>
      </div>
      <div className="date-info">
        <div className="date">Дата: {moment(date).calendar()}</div>
        <div className="time">Время: {time}</div>
      </div>
      <svg
        onClick={() => onRemoveClick(`${row}:${place}`)}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 19"
        width="12px"
        height="18px"
        className="cross">
        <path d="M10.4 9.8l7.3-7.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0L9 8.4 1.7 1.1C1.3.7.7.7.3 1.1s-.4 1 0 1.4l7.3 7.3-7.3 7.3c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3L9 11.2l7.3 7.3c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4l-7.3-7.3z"></path>
      </svg>
    </div>
  );
}

export default TicketItem;
