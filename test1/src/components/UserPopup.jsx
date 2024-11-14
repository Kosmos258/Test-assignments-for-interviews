import React, { useEffect } from 'react';

import close from '../img/close.svg';

function UserPopup({ user, onClose }) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.modal__content') === null) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="modal">
      <div className="modal__content">
        {user.image && (
          <img src={user.image} alt={user.name}/>
        )}
        <div className="modal__header">
          <h3 className='header__name'>{user.name}</h3>
          <button className="modal__close-button" onClick={onClose}><img src={close} alt="close" /></button>
        </div>
        <div className="modal_content">
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Телефон:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.phone}</p>
                    </ul>
                </div>
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Email:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.email}</p>
                    </ul>
                </div>
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Дата приёма:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.hire_date}</p>
                    </ul>
                </div>
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Должность:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.position_name}</p>
                    </ul>
                </div>
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Адрес:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.address}</p>
                    </ul>
                </div>
                <div className="columns">
                    <ul className="data_column">
                        <li><p className="p_modal">Подразделение:</p></li>
                    </ul>
                    <ul>
                        <p className="p_text">{user.department}</p>
                    </ul>
                </div>
                <div className="additional__information">
                    <p>Дополнительная информация:</p>
                    <p className="p_text otstup otstup">Разработчики используют текст в качестве заполнителя макта страницы. Разработчики используют текст в качестве заполнителя макта страницы.</p>
                </div>
            </div>
      </div>
    </div>
  );
}

export default UserPopup;