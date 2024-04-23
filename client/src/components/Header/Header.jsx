import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Header.module.css'; // Importa el archivo de estilos CSS para el encabezado

function Header() {
  const location = useLocation();

  // Agrega el event listener cuando el componente se monta
  useEffect(() => {
    const toggleDarkMode = () => {
      const body = document.body;
      body.classList.toggle('dark-mode');
    };

    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Elimina el event listener cuando el componente se desmonta
    return () => {
      darkModeToggle.removeEventListener('click', toggleDarkMode);
    };
  }, []); // El arreglo vacío [] asegura que este efecto se ejecute solo una vez, cuando el componente se monta

  return (
    <div className={styles.mainHeader}>
      <div className={styles.nav}>
        <div className={styles.div1}>
          {location.pathname !== '/' && (
            <li><Link to="/" className={styles.navLink}>
              <button className={styles.button1}>
                <span className={styles.span1}>
                  <span>I</span>
                  <span>n</span>
                  <span>i</span>
                  <span>c</span>
                  <span>i</span>
                  <span>o</span>
                </span>
                <span className={styles.span2}>
                  <span>I</span>
                  <span>n</span>
                  <span>i</span>
                  <span>c</span>
                  <span>i</span>
                  <span>o</span>
                </span>
              </button>
            </Link></li>
          )}

          {location.pathname !== '/cart' && (
            <li><Link to="/cart" className={styles.navLink}>
              <button className={styles.button1}>
                <span className={styles.span1}>
                  <span>C</span>
                  <span>a</span>
                  <span>r</span>
                  <span>r</span>
                  <span>i</span>
                  <span>t</span>
                  <span>o</span>
                </span>
                <span className={styles.span2}>
                  <span>C</span>
                  <span>a</span>
                  <span>r</span>
                  <span>r</span>
                  <span>i</span>
                  <span>t</span>
                  <span>o</span>
                </span>
              </button>
            </Link></li>
          )}
        </div>

        <div className={styles.div2}>
          <div className={styles.darkModeToggle}>
            <label className={styles.switch} htmlFor="dark-mode-toggle">
              <input type="checkbox" id="dark-mode-toggle" className={styles.input__check} />
              <span className={styles.slider}></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;