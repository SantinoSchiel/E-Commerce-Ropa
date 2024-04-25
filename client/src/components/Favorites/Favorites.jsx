import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/actions';
import style from './Favorites.module.css'
import { Link } from 'react-router-dom';

function Favorites() {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    console.log(products, 'products');

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const favorites = useSelector(state => state.favorites.wishlist);
    console.log(favorites, 'favorites');

    const favoriteProducts = products.filter(product => favorites.includes(product.id));

    return (
        <div>
            <h2>Mis Favoritos</h2>
            <div>
                {
                    favoriteProducts.map(product => (
                        <div className={style.card}>
                            <div className={style.cardImg}>
                                <img src={product.images[0]} alt={product.name} />
                            </div>
                            <div className={style.cardTitle}>{product.name}</div>
                            <hr className={style.cardDivider} /> {/* Asegúrate de cerrar la etiqueta hr correctamente */}
                            <div className={style.cardFooter}>
                                <div className={style.cardPrice}><span>$</span>{product.price}</div> {/* Ajustado el formato del precio */}
                                <Link to={`/product/${product.id}`} className={style.detailsLink}>
                                    <button className={style.cardBtn}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="m397.78 316h-205.13a15 15 0 0 1 -14.65-11.67l-34.54-150.48a15 15 0 0 1 14.62-18.36h274.27a15 15 0 0 1 14.65 18.36l-34.6 150.48a15 15 0 0 1 -14.62 11.67zm-193.19-30h181.25l27.67-120.48h-236.6z"></path>
                                            <path d="m222 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                                            <path d="m368.42 450a57.48 57.48 0 1 1 57.48-57.48 57.54 57.54 0 0 1 -57.48 57.48zm0-84.95a27.48 27.48 0 1 0 27.48 27.47 27.5 27.5 0 0 0 -27.48-27.47z"></path>
                                            <path d="m158.08 165.49a15 15 0 0 1 -14.23-10.26l-25.71-77.23h-47.44a15 15 0 1 1 0-30h58.3a15 15 0 0 1 14.23 10.26l29.13 87.49a15 15 0 0 1 -14.23 19.74z"></path>
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div >
                    ))
                }
            </div>
        </div>
    );
}

export default Favorites;