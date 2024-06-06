import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, getUsers } from '../../redux/actions';
import styles from './CartPage.module.css';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { Link } from 'react-router-dom';


const URL_API = import.meta.env.VITE_URL_API;
const PUBLIC_KEY = 'APP_USR-b9bf9934-2435-43d3-9130-8a4f5733b456';

function Cart() {
  const dispatch = useDispatch();
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const [cartItems, setCartItems] = useState([]);
  const products = useSelector(state => state.products.products);
  const productsLoading = useSelector(state => state.products.loading);
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const [preferenceId, setPreferenceId] = useState(null);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (!products.length && !productsLoading) {
      dispatch(fetchProducts());
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const users = await dispatch(getUsers());
        console.log(users, 'users');
        const user = users.find(user => user.id === userFromLocalStorage.id);
        console.log(user, 'user');
        const userCart = user.cart;
        setCartItems(userCart); // Actualizar el estado del carrito
        const initialQuantities = {};
        Object.keys(userCart).forEach(productId => {
          initialQuantities[productId] = userCart[productId];
        });
        setQuantities(initialQuantities);
      } catch (error) {
        console.error('Error al obtener el carrito del usuario:', error);
      }
    };
    fetchData();
  }, []);

  const handleRemoveFromCart = async productId => {
    try {
      const product = products.find(product => product.id === productId);
      const action = 'reducir'; // o 'eliminar'
      const { data } = await axios.delete(`${URL_API}/customer/cart/${userFromLocalStorage.id}/${product.id}?action=${action}`);
      console.log(data, 'dataFromHandleRemoveFromCart');

      // Actualizar el estado de cartItems y quantities después de eliminar el producto del carrito
      const updatedCartItems = { ...cartItems };
      const updatedQuantities = { ...quantities };

      // Si la cantidad actual del producto es mayor que 1, simplemente reducimos la cantidad
      if (updatedCartItems[productId] > 1) {
        updatedCartItems[productId]--;
        updatedQuantities[productId]--;
      } else {
        // Si la cantidad es 1, eliminamos completamente el producto
        delete updatedCartItems[productId];
        delete updatedQuantities[productId];
      }

      setCartItems(updatedCartItems);
      setQuantities(updatedQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateTotalPrice = () => {
    let total = 0;
    Object.entries(cartItems).forEach(([productId, quantity]) => {
      const product = products.find(product => product.id === productId);
      if (product) {
        total += product.price * quantity;
      }
    });
    return total;
  };

  if (productsLoading) {
    return <p>Loading cart...</p>;
  }

  const handleAddToCart = async productId => {
    const product = products.find(product => product.id === productId);
    const { data } = await axios.put(`${URL_API}/customer/cart/${userFromLocalStorage.id}`, product.id);
    console.log(data.cart, 'dataFromHandleAddToCart');

    const updatedCartItems = { ...cartItems, [productId]: (cartItems[productId] || 0) + 1 };
    setCartItems(updatedCartItems);
    const updatedQuantities = { ...quantities, [productId]: (quantities[productId] || 0) + 1 };
    setQuantities(updatedQuantities);
  };

  const handleMoveFromCart = async productId => {
    try {
      const product = products.find(product => product.id === productId);
      const action = 'eliminar';
      const { data } = await axios.delete(`${URL_API}/customer/cart/${userFromLocalStorage.id}/${product.id}?action=${action}`);
      console.log(data, 'dataFromHandleMoveFromCart');

      // Actualizar el estado de cartItems y quantities después de eliminar el producto del carrito
      const updatedCartItems = { ...cartItems };
      delete updatedCartItems[productId];
      setCartItems(updatedCartItems);

      const updatedQuantities = { ...quantities };
      delete updatedQuantities[productId];
      setQuantities(updatedQuantities);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initMercadoPago(PUBLIC_KEY, { locale: 'es-AR' });
  }, []);

  const createReferenceId = async () => {
    try {
      const productData = Object.entries(cartItems).map(([productId, quantity]) => {
        const product = products.find(product => product.id === productId);
        return {
          id: product.id,
          title: product.name,
          unit_price: product.price,
          quantity: quantity,
        };
      });

      console.log(productData, 'productData');

      const response = await axios.post(`${URL_API}/create-order`, {
        products: productData
      });

      console.log(response.data, 'Response data from create-order');
      return response.data.id;
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  };


  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/cart`);
    } else {
      const referenceId = await createReferenceId();
      if (referenceId) {
        setPreferenceId(referenceId);
      }
    }
  };

  const params = new URLSearchParams(window.location.search) || false;
  const paymentId = params.get('payment_id') || false;
  console.log(paymentId, 'paymentId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (paymentId) {
          const product = products.find(product => product.id === productId);
          console.log(product, 'product');
          if (!product) return null;

          const amount = calculateTotalPrice();

          const { data } = await axios.post(`${URL_API}/purchase`, {
            paymentId: paymentId,
            amount: amount,
            customerId: userFromLocalStorage.id,
            adminId: product.adminId,
          });
          console.log(data, 'dataFromhandleBuyNow');
        }
      } catch (error) {
        console.error('Error handling purchase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.cartContainer}>
      <div className={styles.productsColumn}>
        <div className={styles.productList}>
          {Object.entries(cartItems).length === 0 ? (
            <p className={styles.emptyCartMessage}>Añade productos al carrito!!</p>
          ) : (
            Object.entries(cartItems).map(([productId, quantity]) => {
              const product = products.find(product => product.id === productId);
              if (!product) return null;
              return (
                <div key={productId} className={styles.productCard}>
                  <div className={styles.productDetails}>
                    <img src={product.images[0]} className={styles.productImage} loading="lazy" alt="" />
                    <h3 className={styles.productName}>{product.name}</h3>
                    <div className={styles.actions}>
                      <button className={styles.removeButton} onClick={() => handleMoveFromCart(productId)}>Eliminar</button>
                      <Link to={`/product/${productId}`}>
                        <button className={styles.buyNowButton}>Comprar ahora</button>
                      </Link>
                    </div>
                  </div>
                  <div className={styles.quantityControl}>
                    <button
                      className={`${styles.quantityButton} ${quantities[productId] === 1 ? styles.disabled : ''}`}
                      onClick={() => handleRemoveFromCart(productId)}
                      disabled={quantities[productId] === 1} // También deshabilita el botón utilizando el atributo 'disabled' de HTML
                    >
                      -
                    </button>
                    <span className={styles.quantity}>{quantities[productId]}</span>
                    <button
                      className={`${styles.quantityButton} ${quantities[productId] === 9 ? styles.disabled : ''}`}
                      onClick={() => handleAddToCart(productId)}
                      disabled={quantities[productId] === 9} // También deshabilita el botón utilizando el atributo 'disabled' de HTML
                    >
                      +
                    </button>
                  </div>
                  <p className={styles.productPrice}>${product.price * quantities[productId]}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <div className={styles.summaryColumn}>
        {Object.entries(cartItems).length === 0 ? (
          <></>
        ) : (
          <div className={styles.summaryCard}>
            <h2>Orden de compra</h2>
            <p>Total ${calculateTotalPrice()}</p>
            <button className={styles.checkoutButton} onClick={handleBuyNow}>Continuar compra</button>
            {preferenceId && (
              <div className={styles.walletContainer}>
                <Wallet
                  initialization={{ preferenceId: preferenceId }}
                  customization={{ texts: { valueProp: 'smart_option' } }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;