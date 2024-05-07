import React, { useEffect, useState } from 'react';
import styles from './Dashboard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, getUsers, getAdmins } from '../../redux/actions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const URL_API = import.meta.env.VITE_URL_API;
import Swal from 'sweetalert2';

function Dashboard() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState(null);
    const user = JSON.parse(localStorage.getItem('user'));
    const admin = JSON.parse(localStorage.getItem('admin')) || '';
    const [originalEditableUser, setOriginalEditableUser] = useState({});
    // console.log(user, 'user');
    // console.log(admin, 'admin');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtener todos los usuarios y administradores
                const allUsers = await dispatch(getUsers());
                const allAdmins = await dispatch(getAdmins());

                // Encontrar el usuario o administrador actual por ID
                const currentUser = user ? allUsers.find(u => u.id === user.id) : null;
                const currentAdmin = admin ? allAdmins.find(a => a.id === admin.id) : null;

                // Almacenar la información del usuario o administrador encontrado en el estado local
                setUserData(currentUser || currentAdmin);
            } catch (error) {
                console.error('Error al obtener la información del usuario o del administrador:', error);
            }
        };

        fetchData();
    }, []);

    console.log(userData, 'userData');

    const [showConfig, setShowConfig] = useState(false);
    const [showOrders, setShowOrders] = useState(false);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (userData) {
            setEditableUser({
                email: userData.email || '',
                fullname: userData.fullname || '',
                phone: userData.phone || '',
                address: userData.address || ''
            });
        }
    }, [userData]);

    const [editableUser, setEditableUser] = useState({
        email: userData ? userData.email : '',
        fullname: userData ? userData.fullname : '',
        phone: userData ? userData.phone : '',
        address: userData ? userData.address : ''
    });

    // console.log(editableUser, 'editableUser');

    const handlePutCustomer = async () => {
        try {
            console.log(editableUser, 'editableUser');
            const { data } = await axios.put(`${URL_API}/customer/${user.id}`, editableUser);
            console.log(data, 'dataFromhandlePutCustomer');
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Deseas cerrar sesión?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión'
        }).then((result) => {
            if (result.isConfirmed) {
                // Si se confirma la acción, desloguea al usuario
                dispatch(logoutUser());
                localStorage.removeItem('user');
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('admin');
                navigate('/login');
            }
        });
    };

    const toggleConfig = () => {
        setShowConfig(!showConfig);
        setShowOrders(false);
    };

    const toggleOrders = () => {
        setShowOrders(!showOrders);
        setShowConfig(false);
    };

    const handleEditClick = () => {
        setEditMode(true);
        setOriginalEditableUser({ ...editableUser });
    };

    const handleEditClickCancel = () => {
        setEditMode(false);
        setEditableUser({ ...originalEditableUser });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUser({
            ...editableUser,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const setUser = {
            ...user,
            email: editableUser.email,
            fullname: editableUser.fullname,
            phone: editableUser.phone,
            address: editableUser.address
        };
        // console.log(editableUser, 'editableUser');
        // console.log(setUser, 'setUser');
        setEditMode(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.profile}>
                    <div className={styles.profileImage}>
                        {/* Mostrar imagen del usuario o del admin según corresponda */}
                        <img src={user && user.image || admin && admin.image} alt="Avatar" />
                        <img src="/avatar-placeholder.png" alt="Avatar" />
                    </div>
                    <div className={styles.profileInfo}>
                        <p>¡Bienvenido/a de nuevo, {user && user.fullname || admin && admin.fullname}!</p>
                    </div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <button className={styles.buttonDesloguearse} onClick={toggleConfig}>
                                Mis datos
                            </button>
                        </li>
                        <li>
                            <button className={styles.buttonDesloguearse} onClick={toggleOrders}>
                                Mis pedidos
                            </button>
                        </li>
                        <li>
                            <button className={styles.buttonDesloguearse} onClick={logOut}>
                                Desloguearse
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            <div className={styles.options}>
                {showConfig && (
                    <div>
                        <form className={styles.configForm} onSubmit={handleSubmit}>
                            <label htmlFor="email">Email:</label>
                            <div className={styles.inputGroup}>
                                <input type="email" id="email" name="email" value={editableUser.email} readOnly={!editMode} onChange={handleInputChange} />
                            </div>
                            <label htmlFor="name">Nombre Completo:</label>
                            <div className={styles.inputGroup}>
                                <input type="name" id="name" name="name" value={editableUser.fullname} readOnly={!editMode} onChange={handleInputChange} />
                            </div>
                            <label htmlFor="address">Direccion:</label>
                            <div className={styles.inputGroup}>
                                <input type="address" id="address" name="address" value={editableUser.address} readOnly={!editMode} onChange={handleInputChange} />
                            </div>
                            <label htmlFor="phone">Telefono:</label>
                            <div className={styles.inputGroup}>
                                <input type="phone" id="phone" name="phone" value={editableUser.phone} readOnly={!editMode} onChange={handleInputChange} />
                            </div>

                            <div className={styles.buttonGroup}>
                                {editMode && (
                                    <button type="submit" className={styles.guardar}>
                                        Confirmar
                                    </button>
                                )}
                                {editMode ? (
                                    <button type="button" className={styles.cancelar} onClick={handleEditClickCancel}>
                                        Cancelar
                                    </button>
                                ) : (
                                    <button type="button" className={styles.buttonDesloguearse} onClick={handleEditClick}>
                                        Editar
                                    </button>
                                )}
                                {
                                    editMode ? (
                                        <></>
                                    )
                                        : (
                                            <button className={styles.buttonDesloguearse} onClick={handlePutCustomer}>
                                                Guardar
                                            </button>
                                        )}
                            </div>
                        </form>
                    </div>
                )}
                {showOrders && (
                    <div>
                        <p>Pedidos</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;