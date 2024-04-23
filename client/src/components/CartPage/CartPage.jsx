import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchProducts, removeFromCart, moveFromCart } from '../../redux/actions';
import styles from './CartPage.module.css';

function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const products = useSelector(state => state.products.products);
  const productsLoading = useSelector(state => state.products.loading);

  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (!products.length && !productsLoading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products, productsLoading]);

  useEffect(() => {
    const initialQuantities = {};
    Object.keys(cartItems).forEach(productId => {
      initialQuantities[productId] = cartItems[productId];
    });
    setQuantities(initialQuantities);
  }, [cartItems]);

  const handleRemoveFromCart = productId => {
    console.log('Removing product:', productId);
    dispatch(removeFromCart(productId));
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

  const handleAddToCart = productId => {
    const product = products.find(product => product.id === productId);
    dispatch(addToCart(product));
  };

  const handleMoveFromCart = productId => {
    dispatch(moveFromCart(productId));
  };

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
                      <button className={styles.buyNowButton}>Comprar ahora</button>
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
        <div className={styles.summaryCard}>
          <h2>Orden de compra</h2>
          <p>Total ${calculateTotalPrice()}</p>
          <button className={styles.checkoutButton}>Continuar compra</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;