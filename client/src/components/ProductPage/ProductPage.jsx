// pages/ProductPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from '../ProductDetail/ProductDetail';
import style from './ProductPage.module.css';

function ProductPage() {
  const { id } = useParams();

  return (
    <div>
      <ProductDetail productId={id} />
    </div>
  );
}

export default ProductPage;
