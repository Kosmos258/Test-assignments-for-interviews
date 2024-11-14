import React from 'react';

import phone from '../img/mobile.svg';
import mail from '../img/mail.svg';

function UserCard({ user, onSelectUser }) {
  return (
    <div className="cards__item" onClick={() => onSelectUser(user)}>
      {user.image && (
        <img src={user.image} alt={user.name} className="user-card-image" />
      )}
      <h3 className="cards__header">{user.name}</h3>
      <div className="cards__mini-block">
        <p className="cards__text"><img className='icon' src={phone} alt='phone'/> {user.phone}</p>
        <p className="cards__text"><img className='icon' src={mail} alt='email'/> {user.email}</p>
      </div>
    </div>
  );
}

export default UserCard;