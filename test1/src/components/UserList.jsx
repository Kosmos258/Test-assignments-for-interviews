import React from 'react';
import UserCard from './UserCard';

function UserList({ users, onSelectUser }) {
  const containerClass = users.length === 1 ? 'cards__container one-item' : 'cards__container';

  return (
    <div className={containerClass}>
      {users.map((user, index) => (
        <UserCard
          key={user.id || index}
          user={user}
          onSelectUser={onSelectUser}
        />
      ))}
    </div>
  );
}

export default UserList;