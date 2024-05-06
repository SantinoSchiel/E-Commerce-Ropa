import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import styles from './Register.module.css';
import { createUser } from '../../redux/actions';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [userData, setUserData] = useState({
        email: '',
        fullname: '',
        phone: '',
        address: '',
        image: '',
        password: '',
        confirmPassword: '',
    });

    const [error, setError] = useState(null);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userData.password !== userData.confirmPassword) {
                Swal.fire({
                    title: "Error",
                    text: "Las contraseñas no coinciden",
                    icon: "error",
                    timer: "3000",
                    confirmButtonColor: "rgb(187, 131, 43)",
                });
                return;
            }

            console.log(userData, 'userData');

            const action = await dispatch(createUser(userData));
            console.log(action, 'action');

            if (action.error) {

                let errorMessage = "Ups... Algo salió mal";
                if (action.response.data.error.includes("customers_fullname_key")) {
                    errorMessage = "El nombre ya está en uso";
                } else if (action.response.data.error.includes("customers_email_key")) {
                    errorMessage = "El correo electrónico ya está en uso";
                }

                // Si la acción tiene un error, mostrar el mensaje de error del backend
                Swal.fire({
                    title: "Ups...",
                    text: errorMessage,
                    icon: "error",
                    timer: "3000",
                    confirmButtonColor: "rgb(187, 131, 43)",
                });
            } else if (action.response && action.response.data.error) {
                let errorMessage = "Ups... Algo salió mal";
                if (action.response.data.error.includes("customers_fullname_key")) {
                    errorMessage = "El nombre ya está en uso";
                } else if (action.response.data.error.includes("customers_email_key")) {
                    errorMessage = "El correo electrónico ya está en uso";
                }
                // Si la acción fue exitosa pero el servidor devuelve un error, mostrar el mensaje de error del backend
                Swal.fire({
                    title: "Ups...",
                    text: errorMessage,
                    icon: "error",
                    timer: "3000",
                    confirmButtonColor: "rgb(187, 131, 43)",
                });
            } else {
                // Si la acción fue exitosa y no hay error en la respuesta del servidor, mostrar un mensaje de éxito
                Swal.fire({
                    title: "Éxito",
                    text: "Te has registrado correctamente",
                    icon: "success",
                    timer: "3000",
                    confirmButtonColor: "rgb(187, 131, 43)",
                });

                setTimeout(() => {
                    setRedirectToLogin(true);
                }, 2000);
            }

            setUserData({
                email: '',
                fullname: '',
                phone: '',
                address: '',
                image: '',
                password: '',
                confirmPassword: '',
            });

        } catch (error) {
            console.log(error.message)
            Swal.fire({
                title: "Ops...",
                text: 'Algo salió mal',
                icon: "error",
                timer: "3000",
                confirmButtonColor: "rgb(187, 131, 43)",
            });
        }
    };

    if (redirectToLogin) {
        return <Navigate to="/login" />;
    }

    return (
        <div className={styles['register-container']}>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className={styles['register-form']}>
                <div className={styles['form-group']}>
                    <label htmlFor="fullname">Nombre Completo:</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        value={userData.fullname}
                        onChange={handleChange}
                        className={styles['form-control']}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="email">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className={styles['form-control']}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        className={styles['form-control']}
                        required
                    />
                </div>
                <div className={styles['form-group']}>
                    <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={userData.confirmPassword}
                        onChange={handleChange}
                        className={styles['form-control']}
                        required
                    />
                </div>

                {error && <p className={styles['error-message']}>{error}</p>}
                <div className={styles.register}>
                    <button type="submit" className={styles['submit-button']}>Registrarse</button>
                </div>
                <Link to="/login" className={styles['login-link']}>Ya tengo una cuenta. Iniciar sesión</Link>
            </form>
        </div>
    );
};

export default Register;