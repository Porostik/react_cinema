import React from 'react';
import TicketItem from './TicketItem';
import classNames from 'class-names';

function TicketsCart({
  totalCount,
  totalPrice,
  selectedTickets,
  activeTime,
  removeTicket,
  activeDate,
}) {
  const [isTicketListOpen, setIsTicketListOpen] = React.useState(false);
  const rootRef = React.useRef();

  React.useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.path.includes(rootRef.current)) {
        setIsTicketListOpen(false);
      }
    });
  }, []);

  return (
    <div className="ticket-info" ref={rootRef}>
      <span className="price">Цена: {totalPrice} руб</span>
      <div className="place-quantity">
        <span onClick={() => setIsTicketListOpen((prev) => !prev)}>
          Выбраные места ({totalCount})
        </span>
        <div className={classNames('tickets-list', { active: isTicketListOpen })}>
          {selectedTickets.length > 0 ? (
            selectedTickets.map((item, index) => (
              <TicketItem
                key={index}
                row={item['place'].split(':')[0]}
                place={item['place'].split(':')[1]}
                date={activeDate}
                time={activeTime}
                onRemoveClick={removeTicket}
              />
            ))
          ) : (
            <div className="choose-tickets">
              <p>Вы не выбрали ни одного билета</p>
            </div>
          )}
        </div>
      </div>
      <div className="buy">Купить</div>
    </div>
  );
}

export default TicketsCart;
