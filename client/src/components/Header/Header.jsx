import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css'; // Importa el archivo de estilos CSS para el encabezado
import { useSelector } from 'react-redux';

function Header() {
  const userRedux = useSelector(state => state.user.user);
  const isLoggedInLocalStorage = JSON.parse(localStorage.getItem('isLoggedIn'));
  const isLoggedInRedux = useSelector(state => state.isLoggedIn.isLoggedIn);
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  // console.log(userFromLocalStorage.image, 'userFromLocalStorage');
  const admin = JSON.parse(localStorage.getItem('admin'));
  // console.log(admin, 'admin');

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <li>
          <Link to="/" className={styles.navLink}>
            <button className={styles.button1}>
              Inicio
            </button>
          </Link>
        </li>
        <li>
          <Link to="/cart" className={styles.navLink}>
            <button className={styles.button1}>
              Carrito
            </button>
          </Link>
        </li>
        <li>
          <Link to="/favorites" className={styles.navLink}>
            <button className={styles.button1}>
              Favoritos
            </button>
          </Link>
        </li>
        {admin && admin.id && (
          <li>
            <Link to="/form" className={styles.navLink}>
              <button className={styles.button1}>
                Publicar
              </button>
            </Link>
          </li>
        )}
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
                <button className={styles.button1}>
                  Loguearse
                </button>
              </Link>
            </li>
          )
        )}
      </div>
    </div>
  );
}

export default Header;