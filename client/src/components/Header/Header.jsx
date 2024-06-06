import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import SearchBar from '../SearchBar/SearchBar';
import { searchProducts, resetProducts } from '../../redux/actions';

function Header() {
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const admin = JSON.parse(localStorage.getItem('admin'));
  const dispatch = useDispatch();

  const categoryOptions = {
    hombre: ['Zapatilla', 'Remera', 'Buzo', 'Pantalón', 'Short baño', 'Short deportivo', 'Chomba', 'Jean', 'Camisa', 'Sweater', 'Campera', 'Rompeviento', 'Zapato', 'Boxer', 'Cinto', 'Accesorio', 'Joguing', 'Joguer', 'Chaleco', 'Musculosa'],
    mujer: ['Zapatilla', 'Remera', 'Buzo', 'Pantalón', 'Falda', 'Vestido', 'Body', 'Top', 'Musculosa', 'Camisa', 'Blusa', 'Camisola', 'Jean', 'Palazo', 'Joguing', 'Short', 'Pollera', 'Solera', 'Blazer', 'Tapado', 'Campera', 'Camisaco', 'Chaleco', 'Accesorio', 'Bota', 'Sandalia', 'Borcego', 'Calza', 'Saco', 'Cárdigan'],
  };

  const handleCategoryClick = (category, gender) => {
    dispatch(searchProducts('', category, gender));
  };

  const handleResetProducts = () => {
    dispatch(resetProducts());
  };

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <li>
          <Link to="/" className={styles.navLink} onClick={handleResetProducts}>
            <button className={styles.button1}>Inicio</button>
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navLink}>
            <button className={styles.button1}>Carrito</button>
          </Link>
        </li>
        <li>
          <Link to="/favorites" className={styles.navLink}>
            <button className={styles.button1}>Favoritos</button>
          </Link>
        </li>
        {admin && admin.id && (
          <li>
            <Link to="/form" className={styles.navLink}>
              <button className={styles.button1}>Publicar</button>
            </Link>
          </li>
        )}

        <li>
          <SearchBar />
        </li>

        <li className={styles.dropdown}>
          <div className={styles.dropdownToggle}>Categorías</div>
          <div className={styles.dropdownMenu}>
            <div className={styles.dropdownItem}>
              Hombre
              <div className={styles.subDropdownMenu}>
                {categoryOptions.hombre.map((option) => (
                  <div
                    key={option}
                    className={styles.subDropdownItem}
                    onClick={() => handleCategoryClick(option, 'hombre')}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.dropdownItem}>
              Mujer
              <div className={styles.subDropdownMenu}>
                {categoryOptions.mujer.map((option) => (
                  <div
                    key={option}
                    className={styles.subDropdownItem}
                    onClick={() => handleCategoryClick(option, 'mujer')}
                  >
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </li>
      </div>

      <div className={styles.div2}>
        {(admin && admin.image) ? (
          <div className={styles.img}>
            <Link to='/dashboard'>
              <img src={admin.image} alt="adminImage" className={styles.profileImage} />
            </Link>
          </div>
        ) : (
          (userFromLocalStorage && userFromLocalStorage.image) ? (
            <div className={styles.img}>
              <Link to='/dashboard'>
                <img src={userFromLocalStorage.image} alt="userImage" className={styles.profileImage} />
              </Link>
            </div>
          ) : (
            <li>
              <Link to="/login" className={styles.navLink}>
                <button className={styles.button1}>Loguearse</button>
              </Link>
            </li>
          )
        )}
      </div>
    </div>
  );
}

export default Header;