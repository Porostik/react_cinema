import React from 'react';
import classNames from 'class-names';

function CoverScreen({ isActive, setIsActive }) {
  return (
    <div className={classNames('cover-screen', { active: isActive })}>
      <p>Нельзя зарезервировать больше 5 билетов</p>
      <div className="button" onClick={() => setIsActive()}>
        Закрыть
      </div>
    </div>
  );
}

export default CoverScreen;
