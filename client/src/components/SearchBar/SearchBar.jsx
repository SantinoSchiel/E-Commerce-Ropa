import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchProducts } from '../../redux/actions'; // Importa la acción para buscar productos
import styles from './SearchBar.module.css';
import { FaSearch } from 'react-icons/fa'; // Importa el ícono de búsqueda de react-icons

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(searchProducts(searchTerm)); // Dispara la acción de búsqueda con el término de búsqueda
    setSearchTerm(''); // Limpia el campo de búsqueda después de enviar
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.searchInputWrapper}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Buscar productos…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className={styles.searchButton}>
            <FaSearch className={styles.searchIcon} />
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;