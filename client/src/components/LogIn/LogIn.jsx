import React, { useState } from 'react';
import styles from './LogIn.module.css';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { Link, Navigate } from 'react-router-dom';
import { createUser, loginUser, getUsers } from '../../redux/actions'; // Importa las acciones de createUser y loginUser
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getAdmins } from '../../redux/actions';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está logueado
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const admins = await dispatch(getAdmins());
    console.log(admins, 'admins');
    if (admins) {
      admins.forEach(async (admin) => {
        if (admin.email === email && admin.password === password) {
          const action = await dispatch(loginUser({ email, password }));

          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));
          localStorage.setItem('admin', JSON.stringify(admin));
        };
      });
    }

    const action = await dispatch(getUsers());
    if (action) {
      action.forEach(async (element) => {
        if (element.email === email && element.password === password) {
          const action = await dispatch(loginUser({ email, password }));
          // console.log(action, 'action');

          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', JSON.stringify(true));

          localStorage.setItem('user', JSON.stringify(element));
          const user = JSON.parse(localStorage.getItem('user'));
          console.log(user, 'user');
        };
      });
    }
  }

  // Maneja el éxito del inicio de sesión con Google
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    // console.log(decoded, 'credenciales');

    const action = await dispatch(createUser({
      email: decoded.email,
      fullname: decoded.name,
      image: decoded.picture,
      phone: decoded.phone || "",
      address: decoded.address || "",
      password: decoded.password || ""
    }));

    // console.log(action, 'action && action.payload');

    localStorage.setItem('user', JSON.stringify(action));
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user, 'user');

    // También puedes llamar a la acción para iniciar sesión directamente después de crear el usuario
    dispatch(loginUser({ email: decoded.email, password: decoded.password }));

    setIsLoggedIn(true); // Establece el estado como logueado
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  // Maneja el error del inicio de sesión con Google
  const handleGoogleLoginError = () => {
    // console.log('Login Failed');
  };

  return (
    <div className={styles['login-container']}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit} className={styles['login-form']}>
        <div className={styles['form-group']}>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-group']}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles['form-control']}
            required
          />
        </div>
        <div className={styles['form-button']}>
          <button type="submit" className={styles['submit-button']}>Iniciar Sesión</button>
          <Link to='/register'>
            <button type='button' className={styles.register}>Registrarse</button>
          </Link>
        </div>
        <div className={styles['button-container']}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess} // Utiliza el manejador de éxito personalizado
            onError={handleGoogleLoginError} // Utiliza el manejador de error personalizado
            className={styles['google-login-button']}
          >
            <img src="google-icon.svg" alt="Google Icon" />
            Iniciar sesión con Google
          </GoogleLogin>
        </div>
      </form>
      {isLoggedIn && <Navigate to="/" />}
    </div>
  );
};

export default Login;