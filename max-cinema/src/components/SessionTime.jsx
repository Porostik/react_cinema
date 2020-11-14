import React from 'react';
import classNames from 'class-names';

function SessionTime({ timeArray, activeElement, onSetActiveTime }) {
  return (
    <div className="modal__time">
      {timeArray.map((item, index) => (
        <div
          className={classNames('time__item', { active: item == activeElement })}
          key={`${item}_${index}`}
          onClick={() => onSetActiveTime(item)}>
          {item}
        </div>
      ))}
    </div>
  );
}

export default SessionTime;
