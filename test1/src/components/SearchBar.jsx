import React from 'react';

import search from '../img/search.svg';

function SearchBar({ onSearchChange }) {
  return (
    <div className="header__search-container">
      <input
        type="text"
        className="header__search-input"
        placeholder="Поиск"
        onChange={onSearchChange}
      />
      <img src={search} alt="search" className='header__search-button' />
    </div>
  );
}

export default SearchBar;