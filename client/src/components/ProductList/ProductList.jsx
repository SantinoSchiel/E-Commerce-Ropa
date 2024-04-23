// components/ProductList.js
import React from 'react';
import { useSelector } from 'react-redux';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';

function ProductList({ products }) {
  return (
    <div>
      <div className={styles.productList}>
        {products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductList;