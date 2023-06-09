import { useState } from 'react';
import PropTypes from 'prop-types';
import { IoSearchOutline } from 'react-icons/io5';

export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleFormSubmit = event => {
    event.preventDefault();
    const currentSearchQuery = event.currentTarget.text.value.trim();

    if (currentSearchQuery === '') {
      alert('Введіть назву в поле пошуку');
    } else {
      onSubmit(currentSearchQuery);
    }
    reset();
  };

  const handleChangeInput = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase().trim());
  };

  const reset = () => {
    setSearchQuery('');
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleFormSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">
            <IoSearchOutline className="Icon" />
          </span>
        </button>

        <input
          className="SearchForm-input"
          value={searchQuery}
          type="text"
          name="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChangeInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
