import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import Login from './components/LogIn/LogIn';
import HomePage from './components/HomePage/HomePage';
import ProductPage from './components/ProductPage/ProductPage';
import CartPage from './components/CartPage/CartPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Favorites from './components/Favorites/Favorites'
import Form from './components/ProductForm/ProductForm'
import Register from './components/LogIn/Register';
import Dashboard from './components/DashboardPerfil/Dashboard';
import { loadCartFromLocalStorage } from './redux/actions';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(loadCartFromLocalStorage()); // Acción para cargar el carrito desde localStorage
  }, [dispatch]);

  // Verificar si estamos en la página de registro
  const isRegisterPage = location.pathname === '/register';

  return (
    <main>
      {!isRegisterPage && <Header />} {/* Renderiza el Header si no estamos en la página de registro */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/form" element={<Form />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;