import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, getUsers, moveFromCart, removeFromWishlist } from '../../redux/actions';
import { fetchProducts } from '../../redux/actions';
import styles from './ProductDetail.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

const URL_API = import.meta.env.VITE_URL_API;
const PUBLIC_KEY = 'APP_USR-b9bf9934-2435-43d3-9130-8a4f5733b456';

function ProductDetail({ productId }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const { products, loading } = useSelector(state => state.products);
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
  const [preferenceId, setPreferenceId] = useState(null);
  // console.log(userFromLocalStorage, 'userFromLocalStorage');

  const navigate = useNavigate();

  // console.log(isLoggedIn ? 'logueado' : 'no logueado');

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await dispatch(getUsers());
        const userIdFromLocalStorage = userFromLocalStorage.id;
        const user = users.find(user => user.id === userIdFromLocalStorage);
        if (user) {
          setWishlist(user.favorites || []);
          setCartItems(user.cart || {});
        } else {
          console.log('No se encontró un usuario con el ID correspondiente.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    initMercadoPago(PUBLIC_KEY, { locale: 'es-AR' });
  }, []);

  const createReferenceId = async () => {
    try {
      const product = products.find(product => product.id === productId);
      console.log(product, 'product');
      if (!product) return null;

      const productData = {
        id: product.id,
        title: product.name,
        unit_price: product.price,
        quantity: 1,
      };
      console.log(productData, 'productData');

      const response = await axios.post(`${URL_API}/create-order`, {
        products: [productData]
      });

      // console.log("ACAAAAAAA")
      console.log(response.data, 'Response data from create-order');
      return response.data.id;
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
    }
  };


  const handleBuyNow = async () => {
    if (!isLoggedIn) {
      navigate(`/login?redirect=/product/${productId}`);
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

          const { data } = await axios.post(`${URL_API}/purchase`, {
            paymentId: paymentId,
            amount: product.price,
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
  }, [paymentId, products, productId, userFromLocalStorage.id]);


  const handleMoveFromCart = async () => {
    try {
      const users = await dispatch(getUsers());
      // console.log(users, 'users');

      const userIdFromLocalStorage = userFromLocalStorage.id;

      const user = users.find(user => user.id === userIdFromLocalStorage);
      // console.log(user, 'user');

      if (user) {
        const userCart = user.cart;
        setCartItems(prevCartItems => {
          const updatedCartItems = { ...prevCartItems };
          delete updatedCartItems[productId]; // Elimina el producto del carrito
          return updatedCartItems;
        });
        // console.log(userCart, 'userCart');
      } else {
        console.log('No se encontró un usuario con el ID correspondiente.');
      }

      const idUser = userFromLocalStorage.id;
      const action = 'eliminar';
      const { data } = await axios.delete(`${URL_API}/customer/cart/${idUser}/${productId}?action=${action}`);
      // console.log(data, 'dataFromhandleMoveFromCart');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (products && products.length > 0) {
      // Establece el primer valor de size como el valor predeterminado
      setSelectedSize(products[0].size[0]);
      // Establece el primer valor de color como el valor predeterminado
      setSelectedColor(products[0].color[0]);
    }
  }, [products]);

  if (loading || !products || products.length === 0) {
    return <p>Loading...</p>;
  }

  const product = products.find(product => product.id === productId);

  if (!product) {
    return <p>Product not found.</p>;
  }

  const isWishlist = wishlist.includes(productId);
  const isInCart = cartItems.hasOwnProperty(productId);

  const handleAddToCart = async () => {
    try {
      const users = await dispatch(getUsers());
      // console.log(users, 'users');

      const userIdFromLocalStorage = userFromLocalStorage.id;

      const user = users.find(user => user.id === userIdFromLocalStorage);
      // console.log(user, 'user');

      if (user) {
        const userCart = user.cart;
        setCartItems(prevCartItems => ({
          ...prevCartItems,
          [productId]: true // Agrega el producto al carrito
        }));
        // console.log(userCart, 'userCart');
      } else {
        console.log('No se encontró un usuario con el ID correspondiente.');
      }
      // console.log(userFromLocalStorage[0].id, 'userFromLocalStorage');
      const idUser = userFromLocalStorage.id;
      const { data } = await axios.put(`${URL_API}/customer/cart/${idUser}`, productId);
      // console.log(data, 'dataFromHandleAddToCart');
    } catch (error) {
      console.log(error)
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const users = await dispatch(getUsers());
      const userIdFromLocalStorage = userFromLocalStorage.id;
      const user = users.find(user => user.id === userIdFromLocalStorage);

      if (user) {
        const userFavs = user.favorites;
        const updatedWishlist = [...wishlist, productId];
        setWishlist(updatedWishlist);
      } else {
        console.log('No se encontró un usuario con el ID correspondiente.');
      }
      // console.log(userFromLocalStorage[0].id, 'userFromLocalStorage');
      const idUser = userFromLocalStorage.id;
      const { data } = await axios.put(`${URL_API}/customer/favorites/${idUser}`, { productId });
      // console.log(data, 'dataFromhandleAddToWishlist');
    } catch (error) {
      console.log(error)
    }
  };

  const handleRemoveFromWishlist = async () => {
    try {
      const users = await dispatch(getUsers());
      // console.log(users, 'users');

      const userIdFromLocalStorage = userFromLocalStorage.id;

      const user = users.find(user => user.id === userIdFromLocalStorage);
      // console.log(user, 'user');

      if (user) {
        const userCart = user.cart;
        const updatedWishlist = wishlist.filter(id => id !== productId);
        setWishlist(updatedWishlist);
      } else {
        console.log('No se encontró un usuario con el ID correspondiente.');
      }

      const idUser = userFromLocalStorage.id;
      const { data } = await axios.delete(`${URL_API}/customer/favorites/${idUser}/${productId}`);
      // console.log(data, 'dataFromhandleRemoveFromWishlist');
    } catch (error) {
      console.log(error);
    }
  };


  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleColorChange = (event) => {
    setSelectedColor(event.target.value);
  };

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className={styles.productDetail}>
      <div className={styles.imageGallery}>
        {product.images.map(image => (
          <img
            key={image}
            src={image}
            alt={product.name}
            className={`${styles.thumbnail} ${selectedImage === image ? styles.selected : ''}`}
            onClick={() => handleImageChange(image)}
          />
        ))}
      </div>
      <div className={styles.productImages}>
        <img src={selectedImage || product.images[0]} alt={product.name} />
      </div>
      <div className={styles.productDetails}>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <div className={styles.buttonTalles}>
          <label htmlFor="sizes">Talles:</label>
          <select id="sizes" onChange={handleSizeChange} value={selectedSize}>
            {product.size.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
          {isInCart ? (
            <button className={styles.inCartButton} onClick={handleMoveFromCart}>Eliminar del carrito ❌</button>
          ) : (
            <button onClick={handleAddToCart}>Añadir al carrito ✅</button>
          )}
        </div>
        <div className={styles.buttonColors}>
          <label htmlFor="colors">Colores:</label>
          <select id="colors" onChange={handleColorChange} value={selectedColor}>
            {/* Establece el primer valor de color como el valor predeterminado */}
            {product.color.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
          {isWishlist ? (
            <button onClick={handleRemoveFromWishlist} className={styles.removeFav}>Eliminar de favoritos ❌</button>
          ) : (
            <button onClick={handleAddToWishlist}>Agregar a favoritos ✅</button>
          )}
        </div>
        <div className={styles.divBuy}>
          <button className={styles.buttonBuy} onClick={handleBuyNow}>Comprar</button>
        </div>
        {preferenceId && (
          <div className={styles.walletContainer}>
            <Wallet
              initialization={{ preferenceId: preferenceId }}
              customization={{ texts: { valueProp: 'smart_option' } }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;