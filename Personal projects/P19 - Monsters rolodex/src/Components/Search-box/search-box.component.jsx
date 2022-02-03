import React from 'react';
import './search-box.styles.css';

export const SearchInput = ({ placeholder, handleChange }) => {
  return (
    <input className='search' type="search" placeholder={placeholder} onInput={handleChange} />
  )
}