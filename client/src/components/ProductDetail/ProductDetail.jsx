import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, addToWishlist, removeFromWishlist } from '../../redux/actions';
import { fetchProducts } from '../../redux/actions';
import styles from './ProductDetail.module.css';

function ProductDetail({ productId }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState('');
  const { products, loading } = useSelector(state => state.products);
  const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || []);
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

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

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleAddToWishlist = () => {
    setWishlist([...wishlist, productId]);
    dispatch(addToWishlist(productId));
  };

  const handleRemoveFromWishlist = () => {
    const updatedWishlist = wishlist.filter(id => id !== productId);
    setWishlist(updatedWishlist);
    dispatch(removeFromWishlist(productId));
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
        <div>
          <label htmlFor="sizes">Talles:</label>
          <select id="sizes" onChange={handleSizeChange} value={selectedSize}>
            {product.size.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="colors">Colores:</label>
          <select id="colors" onChange={handleColorChange} value={selectedColor}>
            {/* Establece el primer valor de color como el valor predeterminado */}
            {product.color.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
        {isInCart ? (
          <button className={styles.inCartButton} disabled>Ya se encuenta en el carrito!</button>
        ) : (
          <button onClick={handleAddToCart}>Añadir al carrito</button>
        )}
        {isWishlist ? (
          <button onClick={handleRemoveFromWishlist}>Remover de favoritos</button>
        ) : (
          <button onClick={handleAddToWishlist}>Agregar a favoritos</button>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;